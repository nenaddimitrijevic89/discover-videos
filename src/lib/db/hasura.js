/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGQL(operationsDoc, operationName, variables) {
   const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
      method: 'POST',
      headers: {
         'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
         query: operationsDoc,
         variables: variables,
         operationName: operationName,
      }),
   })

   return await result.json()
}

const operationsDoc = `
    query MyQuery {
      users {
        id
        issuer
        publicAddress
        email
      }
    }
  `

function fetchMyQuery() {
   return queryHasuraGQL(operationsDoc, 'MyQuery', {})
}

export async function startFetchMyQuery() {
   const { errors, data } = await fetchMyQuery()

   if (errors) {
      console.error(errors)
   }

   console.log(data)
}
