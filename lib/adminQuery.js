
//get shop details 
export const createCommentQuery=(productId,message,productUpdatedAt,locale)=>{

    const commentData=new Date().toISOString

    console.log("commentData",commentData)

    const query=`
    mutation{
        bulkProductResourceFeedbackCreate(feedbackInput:[{productId:"gid://shopify/Product/7810393866459",messages:"goood",state:ACCEPTED,feedbackGeneratedAt:"2022-09-30T12:20:09Z",productUpdatedAt:"2022-08-30T12:20:09Z"}]){
          feedback{
            messages
            feedbackGeneratedAt
            productUpdatedAt
            state
          }
          userErrors{
            code
            field
            message
          }
        }
      }
    `
    return query;
  }

  export const productMetafieldQuery=()=>{

    const query=`
    {
      products(first: 36) {
        edges {
          node {
            metafields(first: 2) {
              edges {
                node {
                  value
                  key
                  namespace
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
  export const mutationTestQuery=()=>{

    const query=`
    mutation{
      productUpdate(input:{id:"gid://shopify/Product/7853037977819"
        ,metafields:[{
          namespace:"test",
          key:"test",
          value:"salama-salama@salama.com-gooog-5",
          type:"single_line_text_field"
        }
        ]}){
        product{
          metafields(first:2){
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
    return query;
  }