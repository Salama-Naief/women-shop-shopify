// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, createHttpLink, InMemoryCache ,gql} from '@apollo/client';

const httpLink=createHttpLink({
  uri:process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_URL,
  headers: {
    "X-Shopify-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKRN,
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})


const clientAdmin = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache()
});





export default async function handler(req, res) {
  const rateId=req.body.id
  try {
  if(rateId){
    const query=gql` query {
    product(id:"${rateId}"){
          metafields(first:3,namespace:"rate"){
            edges{
              node{
                id
                value
              }
            }
          }
        }
      }
      `

      const {data}=await clientAdmin.query({
        query
      })
      res.status(200).json({product:data.product})
      
    }

    }catch (error) {
    res.status(404).json(error)
  }
}
