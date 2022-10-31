import { ApolloClient, createHttpLink, InMemoryCache ,gql,from} from '@apollo/client';

import { onError } from "@apollo/client/link/error";
import shortid from 'shortid';

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const httpLink=createHttpLink({
  uri:process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_URL,
  headers: {
    "X-Shopify-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKRN,
    "Content-Type": "application/json"
  }
})


const clientAdmin = new ApolloClient({
  ssrMode: false,
  link:from([errorLink,httpLink]) ,
  cache: new InMemoryCache()
  
});





const  handler=async(req, res)=> {
    const rateId=req.body.rateId
    const productId=req.body.productId
    const rate=req.body.rate
    let mutation=null
 // try{
  if(productId&&rate){
    if(rateId){
        mutation=gql`mutation {
            productUpdate(input:{id:"${productId}",metafields:[{id:"${rateId}",value:"${rate}"}]}){
              userErrors{
                field
                message
              }  
            product{
                metafields(first:10){
                  edges{
                    node{
                      id
                      value
                      namespace
                    }
                  }
                }
              }
            }
          }
            `
    }else{
        mutation=gql`mutation {
      productUpdate(input:{id:"${productId}",metafields:[{namespace:"rate",key:"${shortid.generate()}",value:"${rate}",type:"single_line_text_field"}]}){
        userErrors{
          field
          message
        }  
      product{
          metafields(first:10){
            edges{
              node{
                namespace
                value
                id
              }
            }
          }
        }
      }
    }
      `
    }
   

      const data=await clientAdmin.mutate({
        mutation
      })
      console.log("data",data)
      res.status(200).json(data.data.productUpdate)
      
    }
  //}catch(error){
 //   res.status(200).json({error})
 // }

}

export default handler;