import jwt from 'jsonwebtoken'

import { createNewUser, isNewUser } from 'lib/db/hasura'
import { magicAdmin } from 'lib/magic'
import { setTokenCookie } from 'lib/cookies'

export default async function login(req, res) {
   if (req.method === 'POST') {
      try {
         const auth = req.headers.authorization
         const didToken = auth ? auth.substring(7) : ''

         //invoke magic
         const metadata = await magicAdmin.users.getMetadataByToken(didToken)

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

         const isNewUserQuery = await isNewUser(token, metadata.issuer)

         isNewUserQuery && (await createNewUser(token, metadata))
         //set the cookie
         const cookie = setTokenCookie(token, res)
         console.log({ cookie })
         res.send({ done: true })
      } catch (error) {
         console.error('Something went wrong logging in', error)
         res.status(500).send({ done: false })
      }
   } else {
      res.send({ done: false })
   }
}
