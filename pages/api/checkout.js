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
  const checkoutId=req.body.checkoutId
  const dataRes=req.body.data
  try {
    let mutation=null
    const lineItemsObject =dataRes&&dataRes.map(item => {
        return `{
          variantId: "${item.id}",
          quantity:  ${item.variantQuantity}
        }`
      })

    if(checkoutId){
     mutation=gql`  mutation {
        checkoutLineItemsReplace(lineItems:[${lineItemsObject}], checkoutId:"${checkoutId}") {
             checkout{
              id
              webUrl
            }
            userErrors{
              code
              message
              field
            }
          }
        }
      `
    }else{   
        mutation=gql` mutation{
            checkoutCreate(input:{
              lineItems:[${lineItemsObject}]
            }){
              checkout{
                id
                webUrl
              }
              checkoutUserErrors{
                code
                message
                field
              }
            }
          }
          `   
    }

      const data=await clientAdmin.mutate({
        mutation
      })

      res.status(200).json(data.data)

    }catch (error) {
    res.status(404).json(error)
  }
}
