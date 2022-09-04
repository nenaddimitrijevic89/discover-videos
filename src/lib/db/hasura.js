/*
This is an example snippet - you should consider tailoring it
to your service.
*/

// export async function isNewUser(token, issuer) {
//    const operationsDoc = `
//       query isNewUser($issuer: String!) {
//          users(where: {issuer: {_eq: $issuer}}) {
//             id
//             email
//             issuer
//          }
//       `

//    const response = await queryHasuraGQL(operationsDoc, 'isNewUser', { issuer }, token)
//    // console.log({ response })
//    return response?.data?.users?.length === 0
// }

// export async function createNewUser(token, metadata) {
//    const operationsDoc = `
//    mutation createNewUser($email: String, $issuer: String!, $publicAddress: String!) {
//       insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
//          returning {
//          email
//          id
//          issuer
//          }
//       }
//    }
//    `
//    const { email, issuer, publicAdress } = metadata

//    const response = await queryHasuraGQL(
//       operationsDoc,
//       'createNewUser',
//       { email, issuer, publicAdress },
//       token
//    )
//    // console.log({ response })
//    return response
// }

// async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
//    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
//       method: 'POST',
//       headers: {
//          Authorization: `Bearer ${token}`,
//          'Content-type': 'application/json',
//       },
//       body: JSON.stringify({
//          query: operationsDoc,
//          variables: variables,
//          operationName: operationName,
//       }),
//    })

//    return await result.json()
// }
const token =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweEE5MTdiMjJlRjhGRTBFNGNjQjg1OGVlMTlCRGJlMTQ1ZTUwNDhkMjkiLCJwdWJsaWNBZGRyZXNzIjoiMHhBOTE3YjIyZUY4RkUwRTRjY0I4NThlZTE5QkRiZTE0NWU1MDQ4ZDI5IiwiZW1haWwiOiJkaW1uZW42ODZAZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsImlhdCI6MTY2MTk2MDA4OCwiZXhwIjoxNjYyNTY0ODg4LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHhBOTE3YjIyZUY4RkUwRTRjY0I4NThlZTE5QkRiZTE0NWU1MDQ4ZDI5In19.jx9s5iK6e_pjs2-vcSmHJYqYuzqeD55MnF3uR1Ldc20'
async function queryHasuraGQL(operationsDoc, operationName, variables) {
   const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
      method: 'POST',
      headers: {
         // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
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

function fetchMyQuery() {
   const operationsDoc = `
     query MyQuery {
       users {
         email
         id
         issuer
         publicAddress
       }
     }
   `
   return queryHasuraGQL(operationsDoc, 'MyQuery', {})
}

export async function startFetchMyQuery() {
   const { errors, data } = await fetchMyQuery()
   if (errors) {
      // handle those errors like a pro
      console.error(errors)
   }
   // do something great with this precious data
   console.log(data)
}
startFetchMyQuery()
