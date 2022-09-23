import jwt from 'jsonwebtoken'

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
            res.send({ msg: 'it works', decoded })
         }
      } catch (err) {
         console.error('Error ocured /stats', err)
         res.status(500).send({ done: false, error: err?.message })
      }
   }
}
