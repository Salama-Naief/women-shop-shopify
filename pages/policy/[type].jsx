import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import Layout from '../../components/utils/Layout';
import { getPages, getProductsType, shopDetails, shopPolicy } from '../../lib/shopify';

function Policy({errMsg,policy,pages}) {
  
  const [policyData,setPolicyData]=useState({});
  useEffect(()=>{

    if(policy.privacyPolicy){

      setPolicyData(policy.privacyPolicy)

    }else if(policy.refundPolicy){

      setPolicyData(policy.refundPolicy)

    }else if(policy.shippingPolicy){

      setPolicyData(policy.shippingPolicy)

    }else if(policy.termsOfService){

      setPolicyData(policy.termsOfService)

    } 

  },[policy])
  return (
    <Layout title={`policies-${policyData.title}`} pages={pages}>
      <div className='container mx-auto my-8 flex justify-center'>
        {
          errMsg?(
            <div className="flex w-full h-screen items-center justify-center text-secondary">
              error in server
            </div>
          ):(
            <div className="px-2 w-full md:w-2/3">
              <h1 className="text-6xl text-center my-4">{policyData.title}</h1>
              <div dangerouslySetInnerHTML={{__html:policyData.body}}/>
            </div>
          )
        }
      </div>
    </Layout>
  )
}
export async function getStaticPaths ({locales}){
  const paths=[]

  //  const articles=await getArticles("EN")
  //  if(articles){
  //      articles.edges.map(article=>{
          locales.map(locale=>{
          paths.push({params:{type:"privacyPolicy"},locale},{params:{type:"refundPolicy"},locale},{params:{type:"shippingPolicy"},locale},{params:{type:"termsOfService"},locale})
        })
      //  })
  //  }

    return{
        paths,
        fallback:false
    }
}

export async function getStaticProps(ctx) {

    try{
    const locale=ctx.locale;
    const {type} =ctx.params;

    const policy=await shopPolicy(type,locale)
    const pages=await getPages(locale) 


        return {
        props: {
            policy:JSON.parse(policy),
           pages:JSON.parse(pages)||[],
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product"]))
        },
        }
    }catch(err){
        return {
            props: {
               errMsg:true
            },
        }
    }
 
  }
export default Policy