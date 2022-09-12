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
            sku
            weight
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

  console.log("lineItemsObject",lineItemsObject)
  const query=`
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId:"${checkoutId}",
    ) {
         checkout{
          id
          webUrl
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
//customer(customerAccessToken:"127f44a40be8e2731f7136640124f63a"){
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