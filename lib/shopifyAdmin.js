import {createCommentQuery, mutationTestQuery, productMetafieldQuery} from "./adminQuery"

async function ShopifyData(query) {
    const URL = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_URL
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token":process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKRN,
       // "Accept": "application/json",
        "Content-Type": "application/graphql",
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

//get shop datials
export async function createComment(){
    try {
      const response = await ShopifyData(createCommentQuery())
      const res = response
      return res
    } catch (error) {
      return error
    }
  }

  //get shop datials
export async function productMetafiedAdmin(){
  try {
    const response = await ShopifyData(productMetafieldQuery())
    const res = response
    return res
  } catch (error) {
    return error
  }
}

  //get shop datials
  export async function mutationTest(){
    try {
      const response = await ShopifyData(mutationTestQuery())
      const res = response
      return res
    } catch (error) {
      return error
    }
  }