import jwt from 'jsonwebtoken'

import { findVideoIdByUserId, insertStats, updateStats } from 'lib/db/hasura'

export default async function stats(req, res) {
   try {
      const token = req.cookies.token
      if (!token) {
         res.status(403).send({})
      } else {
         const { favourited, watched = true } = req.body

         const inputParams = req.method === 'POST' ? req.body : req.query
         const { videoId } = inputParams

         if (videoId) {
            const decodedToken = jwt.verify(token, process.env.HASURA_JWT_SECRET_KEY)
            const userId = decodedToken.issuer

            const findVideo = await findVideoIdByUserId(token, userId, videoId)
            const doesStatsExist = findVideo?.length > 0

            if (req.method === 'POST') {
               if (doesStatsExist) {
                  // update
                  const response = await updateStats(token, {
                     userId,
                     videoId,
                     watched,
                     favourited,
                  })
                  res.send({ msg: 'updated', response })
               } else {
                  // add
                  const response = await insertStats(token, {
                     userId,
                     videoId,
                     watched,
                     favourited,
                  })
                  res.send({ msg: 'added', response })
               }
            } else {
               if (doesStatsExist) {
                  res.send(findVideo)
               } else {
                  res.status(404)
                  res.send({ user: null, msg: 'Video not found!' })
               }
            }
         }
      }
   } catch (err) {
      console.error('Error ocured /stats', err)
      res.status(500).send({ done: false, error: err?.message })
   }
}
