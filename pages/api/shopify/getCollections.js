import { collectionProductByHandleQuery } from "../../../lib/query"

async function ShopifyData(query) {
    const URL = process.env.NEXT_PUBLIC_SHOPIFY_URL
  
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKRN,
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


export default async function getCollections(req, res) {
    try {
        const {handle,proudctNum,locale}=req.body
        if(handle&&proudctNum&&locale){
        const response = await ShopifyData(collectionProductByHandleQuery(handle,proudctNum,locale))
        const allProducts =await response.data.collection
        res.status(200).json({data:allProducts })
        }

      } catch (error) {
        res.status(200).json(error)
      }
  }
  