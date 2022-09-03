/*
This is an example snippet - you should consider tailoring it
to your service.
*/

export async function isNewUser(token, issuer) {
   const operationsDoc = `
      query isNewUser($issuer: String!) {
         users(where: {issuer: {_eq: $issuer}}) {
            id
            email
            issuer
         }
      `

   const response = await queryHasuraGQL(operationsDoc, 'isNewUser', { issuer }, token)
   // console.log({ response })
   return response?.data?.users?.length === 0
}

export async function createNewUser(token, metadata) {
   const operationsDoc = `
   mutation createNewUser($email: String, $issuer: String!, $publicAddress: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
         returning {
         email
         id
         issuer
         }
      }
   }
   `
   const { email, issuer, publicAdress } = metadata

   const response = await queryHasuraGQL(
      operationsDoc,
      'createNewUser',
      { email, issuer, publicAdress },
      token
   )
   // console.log({ response })
   return response
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
   const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-type': 'application/json',
      },
      body: JSON.stringify({
         query: operationsDoc,
         variables: variables,
         operationName: operationName,
      }),
   })

   return await result.json()
}
