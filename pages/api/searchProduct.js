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
  const {search}=req.body
  const {locale}=req.body

  try {
    if(search&&locale){
        
        const query=gql`query  @inContext(language: ${locale.toLocaleUpperCase()}){
          products(first:20,query:"${search}"){
            edges{
              node{
                title
                handle
                id
                images(first:1){
                  edges{
                    node{
                      id
                      url
                    }
                  }
                }
              }
            }
          }       
        }
        `   
        const {data}=await clientAdmin.query({
            query
        })
        res.status(200).json(data.products)
    }
    }catch (error) {
    res.status(404).json(error)
  }
}
