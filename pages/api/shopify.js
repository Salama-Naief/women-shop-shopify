

async function ShopifyData(query) {
    const URL = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_URL
  
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKRN,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query })
    }
  
    try {
      const data = await fetch(URL, options).then(response => {
        return response.json()
      })
  
      return data
    } catch (error) {
      throw new Error("Products not fetched")
    }
  }




  export default async function handler(req, res) {
    const productId=req.body.productId
    const comment=req.body.comment
    console.log("idddd==>",productId)
    console.log("comment==>",req)
    try{

    
  
      const query=gql`mutation{
        productUpdate(input:{id:"${productId}",metafields:[{namespace:"comment",key:"comment3",value:"salama",type:"single_line_text_field"}]}){
          userErrors{
            field
            message
          }  
        product{
            metafields(first:10){
              edges{
                node{
                  key
                  namespace
                  value
                }
              }
            }
          }
        }
      }
        `
  
        const data=await ShopifyData(query)
        console.log("data",data)
        res.status(200).json({product:data})
        
      
    }catch(error){
        res.status(200).json({error})
    }
  
  }
  
