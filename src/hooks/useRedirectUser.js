import { verifyToken } from 'lib/utils'

export const useUser = async (context) => {
   const token = context.req ? context.req.cookies.token : null
   const userId = await verifyToken(token)

   return { userId, token }
}
