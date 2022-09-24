import jwt from 'jsonwebtoken'

import { findVideoIdByUser } from 'lib/db/hasura'

export default async function stats(req, res) {
   if (req.method === 'POST') {
      console.log({ cookies: req.cookies })

      try {
         const token = req.cookies.token
         if (!token) {
            res.status(403).send({})
         } else {
            const decoded = jwt.verify(token, process.env.HASURA_JWT_SECRET_KEY)
            console.log({ decoded })

            const userId = 'did:ethr:0xA917b22eF8FE0E4ccB858ee19BDbe145e5048d29'
            const videoId = '4zH5iYM4wJo'

            const findVideoId = await findVideoIdByUser(token, userId, videoId)
            res.send({ msg: 'it works', decoded, findVideoId })
         }
      } catch (err) {
         console.error('Error ocured /stats', err)
         res.status(500).send({ done: false, error: err?.message })
      }
   }
}
