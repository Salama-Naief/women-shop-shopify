// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, createHttpLink, InMemoryCache ,gql} from '@apollo/client';


const httpLink=createHttpLink({
  uri:process.env.NEXT_PUBLIC_SHOPIFY_URL,
  headers: {
    "X-Shopify-Storefront-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKRN,
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})


const clientAdmin = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache()
});





export default async function handler(req, res) {
  const {email,password}=req.body.user
  try {
    if(email,password){
        
        const mutation=gql` mutation {
            customerAccessTokenCreate(input: {email: "${email}",password:"${password}"}) {
              customerUserErrors {
                code
                field
                message
              }
              customerAccessToken {
                accessToken
                expiresAt
              }
            }
          }
        `
      const data=await clientAdmin.mutate({
        mutation
      })

      res.status(200).json(data.data)
    }
    }catch (error) {
    res.status(404).json(error)
  }
}
