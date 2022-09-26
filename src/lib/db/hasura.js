export async function insertStats(token, { userId, videoId, favourited, watched }) {
   const operationsDoc = `
      mutation insertStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
         insert_stats_one(
            object: {
               userId: $userId,
               videoId: $videoId, 
               favourited: $favourited, 
               watched: $watched
            }) {
            favourited
            id
            userId
            videoId
            watched  
         }
      }
   `

   const response = queryHasuraGQL(
      operationsDoc,
      'insertStats',
      {
         userId,
         videoId,
         favourited,
         watched,
      },
      token
   )

   return response
}

export async function updateStats(token, { userId, videoId, favourited, watched }) {
   const operationsDoc = `  
        mutation updateStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
          update_stats(
            where: {
               userId: {_eq: $userId}, 
               videoId: {_eq: $videoId}
            }, 
            _set: {
               favourited: $favourited, 
               watched: $watched
            }) {
            returning {
              favourited
              userId
              videoId
              watched
            }
         }
      }
   `

   const response = queryHasuraGQL(
      operationsDoc,
      'updateStats',
      { userId, videoId, favourited, watched },
      token
   )

   return response
}

export async function findVideoIdByUserId(token, userId, videoId) {
   const operationsDoc = `
   query findVideoIdByUserId($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
         id
         userId
         videoId
         watched
         favourited
      }
   }
`
   const response = await queryHasuraGQL(
      operationsDoc,
      'findVideoIdByUserId',
      {
         userId,
         videoId,
      },
      token
   )

   return response?.data?.stats
}

export async function isNewUser(token, issuer) {
   const operationsDoc = `
   query isNewUser($issuer: String!) {
     users(where: {issuer: {_eq: $issuer}}) {
       id
       email
       issuer
     }
   }
 `
   const response = await queryHasuraGQL(
      operationsDoc,
      'isNewUser',
      {
         issuer,
      },
      token
   )

   return response?.data?.users?.length === 0
}

export async function createNewUser(token, metadata) {
   const operationsDoc = `
   mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
     insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
       returning {
         email
         id
         issuer
       }
     }
   }
 `

   const { issuer, email, publicAddress } = metadata
   const response = await queryHasuraGQL(
      operationsDoc,
      'createNewUser',
      {
         issuer,
         email,
         publicAddress,
      },
      token
   )
   console.log({ response })
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
