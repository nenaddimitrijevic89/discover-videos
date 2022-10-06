import { magicAdmin } from 'lib/magic'
import { removeTokenCookie } from 'lib/cookies'
import { verifyToken } from 'lib/utils'

export async function logout(req, res) {
   console.log('Nenad')
   const token = req.cookies.token
   console.log({ token })
   try {
      if (!token) {
         return res.status(401).json({ message: 'User is not logged in' })
      }

      const userId = verifyToken(token)
      removeTokenCookie(res)

      try {
         await magicAdmin.users.logoutByIssuer(userId)
      } catch (error) {
         console.log("User's session with Magic already expired")
         console.error('Error occurred while logging out magic user', error)
      }
      res.writeHead(302, { Location: '/login' })
      res.end()
   } catch (error) {
      console.error({ error })
      res.status(401).json({ message: 'User is not logged in' })
   }
}
