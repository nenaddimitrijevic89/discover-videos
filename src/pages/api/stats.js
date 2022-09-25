import jwt from 'jsonwebtoken'

import { findVideoIdByUserId, insertStats, updateStats } from 'lib/db/hasura'

export default async function stats(req, res) {
   if (req.method === 'POST') {
      try {
         const token = req.cookies.token
         if (!token) {
            res.status(403).send({})
         } else {
            const { videoId, favourited, watched } = req.body

            if (videoId) {
               const decodedToken = jwt.verify(token, process.env.HASURA_JWT_SECRET_KEY)

               const userId = decodedToken.issuer

               const doesStatsExist = await findVideoIdByUserId(token, userId, videoId)
               if (doesStatsExist) {
                  // update
                  const response = await updateStats(token, {
                     userId,
                     videoId,
                     watched,
                     favourited,
                  })
                  console.log({ response })
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
            }
         }
      } catch (err) {
         console.error('Error ocured /stats', err)
         res.status(500).send({ done: false, error: err?.message })
      }
   }
}
