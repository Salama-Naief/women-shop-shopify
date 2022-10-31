
import {collectionProductByHandleQuery,
  createCheckoutQuery,
  updateCheckoutQuery,
  productByHandleQuery,
  createCustomerQuery, 
  loginQuery, customerQuery, 
  getCollectionsQuery, 
  pagesQuery, 
  productsTypesQuery,
  getProductsQuery,
  productRecommendedQuery,
  blogArticlesQuery,
  articlesQuery,
  blogsQuery,
  blogArticleByHandleQuery,
  shopQuery,
  transtaledQuery,
  shopDatailsQuery,
  productMetafieldQuery,
  pageQuery
} from "./query";


  
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


//get collection products by handle for landing page sliders
export async function getCollectionByHande(handle,productNum,locale) {  
  try {
    
    const response = await ShopifyData(collectionProductByHandleQuery(handle,productNum,locale))
    const allProducts = response.data.collection?response.data.collection:{}
    return JSON.stringify(allProducts)
  } catch (error) {
    return error
  }
  
}


//get product by handle for productPage
export async function getProductByHande(handle,locale) {
    try {
      const response = await ShopifyData(productByHandleQuery(handle,locale))
      const products = response.data.product
      console.log("product from shopify",products)
      return JSON.stringify(products)
    } catch (error) {
      return error
    } 
  }
//create checkout 
  export async function createCheckout(data) {
    
      try {
        const response = await ShopifyData(createCheckoutQuery(data))
        const checkout = response.data.checkoutCreate.checkout
        return JSON.stringify(checkout)
      } catch (error) {
        return error
      } 
    }

//update checkout 
export async function updateCheckout(data,checkoutId) {
    
  try {
    const response = await ShopifyData(updateCheckoutQuery(data,checkoutId))
    const checkout = response.data.checkoutLineItemsReplace.checkout
    return JSON.stringify(checkout)
  } catch (error) {
    return error
  } 
}
  
export async function createCustomer(user){

    try {
      const response = await ShopifyData(createCustomerQuery(user))
      const customer = response.data.customerCreate
      return JSON.stringify(customer)
    } catch (error) {
      return error
    }
}
  
export async function login(email,password){

  try {
    const response = await ShopifyData(loginQuery(email,password))
    const customer = response.data.customerAccessTokenCreate
    return JSON.stringify(customer)
  } catch (error) {
    return error
  }
}
export async function getCustomer(token){

  try {
    const response = await ShopifyData(customerQuery(token))
    const customer = response.data.customer
    return JSON.stringify(customer)
  } catch (error) {
    return error
  }
}

//get herosection colloction
export async function getCollections(typeQuery,collectionCount,locale){
  try {
    const response = await ShopifyData(getCollectionsQuery(typeQuery,collectionCount,locale))
    const collections = response.data.collections
    return JSON.stringify(collections)
  } catch (error) {
    return error
  }
}

//get pages
export async function getPages(locale){
  try {
    const response = await ShopifyData(pagesQuery(locale))
    const pages = response.data.menu?response.data.menu.items:[]
    return JSON.stringify(pages)
  } catch (error) {
    console.log("pages error==>",error)
    return error
  }
}

//get products tags
export async function getProductsType(tag,locale){
  try {
    const response = await ShopifyData(productsTypesQuery(tag,locale))
    const products = response.data.products?response.data.products:[]
    //console.log("products==>",products)
    return JSON.stringify(products)
  } catch (error) {
    console.log("pages error==>",error)
    return error
  }
}

//get products by tag
export async function getProducts(tag,locale){
  try {
    const response = await ShopifyData(getProductsQuery(tag,locale))
    const products = response.data.products
    console.log("products from get prod==>",products)
    return JSON.stringify(products)
  } catch (error) {
    console.log("products error==>",error)
    return error
  }
}

//get products  recommended
export async function getProductRecommended(id,locale){
  try {
    const response = await ShopifyData(productRecommendedQuery(id,locale))
    const products = response.data.productRecommendations
    console.log("products from get prod==>",products)
    return JSON.stringify(products)
  } catch (error) {
    console.log("products error==>",error)
    return error
  }
}

//get blog acticles
export async function getBlogArticles(handle,locale){
  try {
    const response = await ShopifyData(blogArticlesQuery(handle,locale))
    const blosArticles = response.data.blog
    //console.log("products from get prod==>",products)
    return JSON.stringify(blosArticles)
  } catch (error) {
    console.log("products error==>",error)
    return error
  }
}

//get acticles
export async function getArticles(locale){
  try {
    const response = await ShopifyData(articlesQuery(locale))
    const articles = response.data.articles
    //console.log("products from get prod==>",products)
    return JSON.stringify(articles)
  } catch (error) {
    console.log("articles error==>",error)
    return error
  }
}

//get blogs
export async function getBlogs(){
  try {
    const response = await ShopifyData(blogsQuery())
    const blogs = response.data.blogs
    console.log("blogs==>",blogs)
    return JSON.stringify(blogs)
  } catch (error) {
    console.log("blogs error==>",error)
    return error
  }
}

//get article by handle from bog
export async function getblogArticleByHandle(blogHandle,articleHandle,locale){
  try {
    const response = await ShopifyData(blogArticleByHandleQuery(blogHandle,articleHandle,locale))
    const article = response.data.blog.articleByHandle
    console.log("article==>",article)
    return JSON.stringify(article)
  } catch (error) {
    console.log("article error==>",error)
    return error
  }
}

//get shop datials
export async function shopPolicy(type,locale){
  try {
    const response = await ShopifyData(shopQuery(type,locale))
    const shop = response.data.shop
    return JSON.stringify(shop)
  } catch (error) {
    console.log("shop error==>",error)
    return error
  }
}

//get shop datials
export async function productMetafield(type,locale){
  try {
    const response = await ShopifyData(productMetafieldQuery())
    const products = response.data.products
    return JSON.stringify(products)
  } catch (error) {
    console.log("products error==>",error)
    return error
  }
}

//get shop datials
export async function getPage(locale){
  try {
    const response = await ShopifyData(pageQuery())
    const pages = response.data.pages
    return JSON.stringify(pages)
  } catch (error) {
    console.log("pages error==>",error)
    return error
  }
}

