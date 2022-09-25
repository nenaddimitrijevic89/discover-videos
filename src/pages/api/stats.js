import jwt from 'jsonwebtoken'

import { findVideoIdByUserId, insertStats, updateStats } from 'lib/db/hasura'

export default async function stats(req, res) {
   if (req.method === 'POST') {
      try {
         const token = req.cookies.token
         if (!token) {
            res.status(403).send({})
         } else {
            const decodedToken = jwt.verify(token, process.env.HASURA_JWT_SECRET_KEY)

            const videoId = req.query.videoId
            const userId = decodedToken.issuer

            const doesStatsExist = await findVideoIdByUserId(token, userId, videoId)
            if (doesStatsExist) {
               // update it
               const response = await updateStats(token, {
                  userId,
                  videoId,
                  watched: false,
                  favourited: 23,
               })
               console.log({ response })
               res.send({ msg: 'updated', decodedToken, doesStatsExist, response })
            } else {
               // add it
               const response = await insertStats(token, {
                  userId,
                  videoId,
                  watched: false,
                  favourited: 222,
               })
               res.send({ msg: 'added', decodedToken, doesStatsExist, response })
            }
         }
      } catch (err) {
         console.error('Error ocured /stats', err)
         res.status(500).send({ done: false, error: err?.message })
      }
   }
}
