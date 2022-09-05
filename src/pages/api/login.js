import jwt from 'jsonwebtoken'

import { magicAdmin } from 'lib/magic'
import { createNewUser, isNewUser } from 'lib/db/hasura'

export default async function login(req, res) {
   if (req.method === 'POST') {
      try {
         const auth = req.headers.authorization
         const didToken = auth ? auth.substring(7) : ''
         // console.log({ auth })
         //invoke magic
         const metadata = await magicAdmin.users.getMetadataByToken(didToken)
         // console.log({ metadata })

         //create jwt
         const token = jwt.sign(
            {
               ...metadata,
               iat: Math.floor(Date.now() / 1000),
               exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
               'https://hasura.io/jwt/claims': {
                  'x-hasura-allowed-roles': ['user', 'admin'],
                  'x-hasura-default-role': 'user',
                  'x-hasura-user-id': `${metadata.issuer}`,
               },
            },
            process.env.HASURA_JWT_SECRET_KEY
         )

         // console.log({ token })
         const isNewUserQuery = await isNewUser(token, metadata.issuer)

         if (isNewUserQuery) {
            const createNewUserMutation = await createNewUser(token, metadata)
            console.log({ createNewUserMutation })
            res.send({ done: true, msg: 'is a new user' })
         } else {
            res.send({ done: true, msg: 'not a new user' })
         }
      } catch (error) {
         console.error('Something went wrong logging in', error)
         res.status(500).send({ done: false })
      }
   } else {
      res.send({ done: false })
   }
}
