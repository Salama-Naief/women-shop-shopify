import Client from 'shopify-buy';
import ClientQuery from 'shopify-buy/index.unoptimized.umd';
import {collectionProductByHandleQuery,createCheckoutQuery,updateCheckoutQuery,productByHandleQuery,createCustomerQuery, loginQuery, customerQuery} from "./query";




async function ShopifyData(query) {
  const URL = process.env.NEXT_PUBLIC_SHOPIFY_URL


  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKRN,
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


//get collection products by handle for landing page sliders
export async function getCollectionByHande(handle,productNum,locale) {  
  try {
    
    const response = await ShopifyData(collectionProductByHandleQuery(handle,productNum,locale))
    const allProducts = response.data.collection
    return allProducts
  } catch (error) {
    return error
  }
  
}


//get product by handle for productPage
export async function getProductByHande(handle,locale) {
    try {
      const response = await ShopifyData(productByHandleQuery(handle,locale))
      const products = response.data.product
      return products
    } catch (error) {
      return error
    } 
  }
//create checkout 
  export async function createCheckout(data) {
    
      try {
        const response = await ShopifyData(createCheckoutQuery(data))
        const checkout = response.data.checkoutCreate.checkout
        return checkout
      } catch (error) {
        return error
      } 
    }

//update checkout 
export async function updateCheckout(data,checkoutId) {
    
  try {
    const response = await ShopifyData(updateCheckoutQuery(data,checkoutId))
    const checkout = response.data.checkoutLineItemsReplace.checkout
    console.log("checkout res",checkout)
    return checkout
  } catch (error) {
    return error
  } 
}
  
export async function createCustomer(user){

    try {
      const response = await ShopifyData(createCustomerQuery(user))
      const customer = response.data.customerCreate
      console.log("customer",customer)
      return customer
    } catch (error) {
      return error
    }
}
  
export async function login(email,password){

  try {
    const response = await ShopifyData(loginQuery(email,password))
    const customer = response.data.customerAccessTokenCreate
    console.log("login shopi",customer)
    return customer
  } catch (error) {
    return error
  }
}
export async function getCustomer(token){

  try {
    const response = await ShopifyData(customerQuery(token))
    const customer = response.data.customer
    console.log("user shopi",customer)
    return customer
  } catch (error) {
    return error
  }
}

