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
  const {email,password,firstName,lastName}=req.body.userInfo
  try {
    if(email,password,lastName,firstName){
        
        const mutation=gql`mutation{
            customerCreate(input: {firstName: "${firstName}", lastName: "${lastName}", email: "${email}",password:"${password}"}) {
              customer {
                id
                firstName
                lastName
                email
              }
              userErrors {
                field
                message
              }
              customer {
                id
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
