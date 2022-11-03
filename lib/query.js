//get product of index page sliders product

export const collectionProductByHandleQuery=(handle,num,locale)=>{
    const query=`
    query  @inContext(language: ${locale.toLocaleUpperCase()}){
    collection(handle:"${handle}"){
      id
      handle
      title
      descriptionHtml
      description
      image{
        height
        width
        id
        url
      }
      products(first:${num}){
        edges{
          node{
            handle
            id
            vendor
            title
            descriptionHtml
            productType
            createdAt
            variants(first:10){
              edges{
                node{
                  title
                  id
                  selectedOptions{
                    name
                    value
                  }
                  priceV2{
                    amount
                    currencyCode
                  }
                  compareAtPriceV2{
                    amount
                    currencyCode
                  }
                  selectedOptions{
                    name
                    value
                  }
                  image{
                    width
                    height
                    id
                    url
                  }
                  sku
                  weight
                }
              }
            }
            images(first:8){
              edges{
                node{
                  width
                  height
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  
`
    return query;
}


//get product by handle
export const productByHandleQuery=(handle,locale)=>{
  const query=`
  query  @inContext(language:${locale.toLocaleUpperCase()}) {
    product(handle: "${handle}") {
      title
      descriptionHtml
      description
      handle
      id
      vendor
      productType
      createdAt
      options(first:3){
        name
        values
      }
      images(first:10){
        edges{
          node{
            id
            height
            width
            url
          }
        }
      }
      variants(first:10){
        edges{
          node{
            title
            id
            priceV2{
              amount
              currencyCode
            }
            compareAtPriceV2{
              amount
              currencyCode
            }
            selectedOptions{
              name
              value
            }
            image{
              width
              height
              id
              url
            }
          }
        }
      }
      collections(first:1){
        edges{
          node{
            title
            handle
          }
        }
      }
    }
  }
  `
  return query
}

//create Checkout Query
export const createCheckoutQuery=(data)=>{
  const lineItemsObject = data.map(item => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`
  })

  const query=`
  mutation{
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
  return query
}

//create Checkout Query
export const updateCheckoutQuery=(data,checkoutId)=>{
  const lineItemsObject = data.map(item => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`
  })

  const query=`
  mutation {
    checkoutLineItemsReplace(lineItems:[${lineItemsObject}], checkoutId:"${checkoutId}") {
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
  return query
}

//create customer
export const createCustomerQuery=(user)=>{

  const query=`
    mutation{
      customerCreate(input: {firstName: "${user.firstName}", lastName: "${user.lastName}", email: "${user.email}",password:"${user.password}"}) {
        customer {
          id
          firstName
          lastName
          email
        }
        userErrors {
          field
          message
        }
        customer {
          id
        }
      }
    }
  
  `
  return query;
}

//login customer
export const loginQuery=(email,password)=>{

  const query=`
  mutation {
    customerAccessTokenCreate(input: {email: "${email}",password:"${password}"}) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
  `
  return query;
}
//login customer
export const customerQuery=(token)=>{
  const query=`
  {
    customer(customerAccessToken: "${token}") {
      email
      firstName
      lastName
      orders(first: 10) {
        edges {
          node {
            currentTotalPrice {
              amount
            }
            lineItems {
              edges {
                node {
                  quantity
                  title
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  variant {
                    image {
                      height
                      id
                      url
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
      lastIncompleteCheckout {
        completedAt
        email
        id
        webUrl
        shippingLine {
          handle
          title
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }
  `
  return query;
}

//get collection for banner and top,bottom sections
export const getCollectionsQuery=(typeQuery,collectionCount,locale)=>{

  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    collections(query:"${typeQuery}",reverse:true,first:${collectionCount}){
      edges{
        node{
          description
          id
          title
          handle
          image{
            width
            height
            url
          }
        }
      }
    }
    
  }
  `
  return query;
}

//pages 
/*export const pagesQuery=(locale)=>{

  const query=`
  query  @inContext(language:${locale.toLocaleUpperCase()}){
    menu(handle:"main-menu") {
      items {
        title
        type
        id
        items {
          title
          id
          type
          tags
        }
      }
    }         
  }
  `
  return query;
}*/

//get Products 
export const getProductsQuery=(tag,locale)=>{
  
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    products(first:20,query:"tag:${tag}",reverse:true){
      edges{
        node{
          title
          vendor
          id
          handle
          description
          productType
          createdAt
          variants(first:1){
            edges{
              node{
                id
                selectedOptions{
                  name
                  value
                }
                compareAtPriceV2{
                  amount
                  currencyCode
                }
                priceV2{
                  amount
                  currencyCode
                }
                image{
                  width
                  height
                  id
                  url
                }
              }
            }
          }
          images(first:10){
            edges{
              node{
                height
                id
                width
                url
              }
            }
          }
        }
      }
    }         
  }
  `
  return query;
}

export const searchProductsQuery=(tag,locale)=>{
  
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    products(first:20,query:"${tag}",reverse:true){
      edges{
        node{
          title
          vendor
          id
          handle
          description
          productType
          createdAt
          variants(first:1){
            edges{
              node{
                id
                selectedOptions{
                  name
                  value
                }
                compareAtPriceV2{
                  amount
                  currencyCode
                }
                priceV2{
                  amount
                  currencyCode
                }
                image{
                  width
                  height
                  id
                  url
                }
              }
            }
          }
          images(first:10){
            edges{
              node{
                height
                id
                width
                url
              }
            }
          }
        }
      }
    }         
  }
  `
  return query;
}


//get recommended products
export const productRecommendedQuery=(id,locale)=>{
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    productRecommendations(productId: "${id}") {
      title
      id
      handle
      description
      productType
      createdAt
      variants(first: 1) {
        edges {
          node {
            id
            image{         
                  height
                  id
                  width
                  url
            }
            selectedOptions {
              name
              value
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            height
            id
            width
            url
          }
        }
      }
    }         
  }
  `
  return query;
}

//get all blogs 
export const blogsQuery=()=>{
  const query=`
  {
    blogs(first: 3) {
      edges {
        node {
          title
          handle
          id
        }
      }
    }
  }
  `
  return query;
}

//get blog 
export const blogArticlesQuery=(handle,locale)=>{
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    blog(handle:"${handle}"){
      title
      articles(first:15,reverse:true){
        edges{
          node{
            excerpt
            publishedAt
            title
            handle
            image{
              height
              width
              url
            }
            authorV2{
              name
              email
            }
          }
        }
      }
    } 
  }
  `
  return query;
}

//get articles 
export const articlesQuery=(locale)=>{
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    articles(first:10,reverse:true){
      edges{
        node{
          handle
          title
          publishedAt
          blog{
            title
            handle
          }
          image{
            height
            width
            url
          }
          authorV2{
            name
          }
        }
      }
    }
  }
  `
  return query;
}

//get single article 
export const blogArticleByHandleQuery=(blogHandle,articleHandle,locale)=>{
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    blog(handle: "${blogHandle}") {
      articleByHandle(handle: "${articleHandle}") {
        contentHtml
        title
        publishedAt
        tags
        comments(first: 10) {
          edges {
            node {
              contentHtml
              id
              author {
                email
                name
              }
            }
          }
        }
        image {
          height
          width
          url
        }
        authorV2 {
          name
          email
        }
      }
    }
  }
  `
  return query;
}

//get shop details 
export const shopQuery=(type,locale)=>{
  const query=`
  query  @inContext(language: ${locale.toLocaleUpperCase()}){
    shop{
     ${type}{
      handle
      title
      body
    } 
    }
  }
  `
  return query;
}


//get shop details 
export const productMetafieldQuery=()=>{
  const query=`
  {
    products(first: 36) {
      edges {
        node {
          metafields(identifiers:[{namespace: "alireviews", key: "seo_rating_review_key"},{namespace: "custom", key: "customer"}]) {
            value
            namespace
            type
          }
        }
      }
    }
  }
  `
  return query;
}


//get shop details 
export const pagesQuery=(locale)=>{
  const query=`
  query  @inContext(language:${locale.toLocaleUpperCase()}){
    pages(first:10){
      edges{
        node{
          title
          handle
        }
      }
    }
  }
  `
  return query;
}