// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, createHttpLink, InMemoryCache ,gql} from '@apollo/client';

import { productMetafiedAdmin } from "../../lib/shopifyAdmin"

const httpLink=createHttpLink({
  uri:process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_URL,
  headers: {
    "X-Shopify-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKRN,
    "Accept": "application/json",
    //"Content-Type": "application/graphql",
    "Content-Type": "application/json"
  }
})


const clientAdmin = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache()
});





export default async function handler(req, res) {
  const id=req.body.id
  console.log("idddd==>",id)
  try {
  if(id){

    const query=gql` query {
    product(id:"${id}"){
          metafields(first:10,namespace:"comment"){
            edges{
              node{
                key
                id
                value
                namespace
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
