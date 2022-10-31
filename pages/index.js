import Head from 'next/head';
import Image from 'next/image';
import HomeBanner from "../components/home/Banner";
import Slider from '../components/home/Slider';
import BoxCollection from '../components/home/BoxCollection';
import {API_URL} from '../utils/url';
import Layout from '../components/utils/Layout';
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCollectionByHande, getCollections, getPage, getPages, getProductsType, productMetafield} from '../lib/shopify';
import { Store } from '../utils/Store';
import Policies from '../components/utils/Policies';
import { mutationTest, productMetafiedAdmin } from '../lib/shopifyAdmin';




 function Home({errMsg ,page,pages,productsTypes,newColloction,bottomSection,topSection,panerSection,sellingColloction,offersColloction}) {
  const router =useRouter();
  const {pathname,query,asPath}=router;
  const {state}=useContext(Store);
  //const [loading,setLoading]=useState(true);
  const {t,i18n}= useTranslation();
  const [shop,setShop]=useState({}); 
  const [newCol,setNewColection]=useState([]); 
  const [womenCol,setWomanColection]=useState([]); 
  const [menCol,setMenColection]=useState([]); 
  const [topCollection,setTopColection]=useState([]); 
  const [carousal,setCarousal]=useState([]); 

 useEffect(()=>{
   /*const fun=async()=>{
    const url="http://change-language.weglot.com/ar"
    const commentRes = await fetch(url)
    const comments=await commentRes.json();
    console.log("any thing",comments)
   }
   fun()*/
 },[])
  
   useEffect(()=>{
    router.push({pathname,query},asPath,{locale:i18n.language})
   // router.push({pathname,query},asPath,{locale:window.Weglot.getCurrentLang()})
  },[i18n.language])
/*if(window.Weglot){
  window.Weglot.on("languageChanged",(newLang, prevLang)=>{
    router.push({pathname,query},asPath,{locale:newLang})
  })
}
/*if(!window.Weglot){
  const script=document.createElement("script");
  script.type="text/javascript";
  script.src="https://cdn.weglot.com/weglot.min.js";
  const cc= document.head.appendChild(script)
  console.log("ccc",window.Weglot)
}*/

/*  if(window.Weglot&&!window.Weglot.nitialized){
    window.Weglot.initialize({
      api_key:'wg_df2e98f9cef03f521b0541d1b65028704'
    });
    
  }*/



  //error
  if(errMsg){
    return(
      <Layout  title="error page">
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>error in back end connection</div></div>  
    </Layout>
    )
  }

  /*//loading
  if(loading){
    return(
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>loading...</div></div>  
    )
  }*/
  return (
    <Layout title="homePage" t={t} shop={shop} page={page} productsTypes={productsTypes} desc="homePage" pages={pages}>
    <div className='scroll-smooth'>
      <div className="h-fit ">
        <HomeBanner panerSection={panerSection?panerSection:{}}/>                                                            
         <BoxCollection topSection={topSection?topSection:{}}/>
         {/*<div className='grid md:grid-cols-3 container mx-auto  mt-4'>
         <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckDelivery className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.FreeShipping_arabic:shoDetail.attributes.FreeShipping}</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.freeReturn_arabic:shoDetail.attributes.FreeReturn}</span>
          </div>
          <div className="flex items-center cursor-pointer justify-center border py-4 text-center mx-1">
              <TbTruckReturn className='text-3xl text-primary'/>
              <span className='text-gray-900 text-lg mx-2'>{i18n.language==="ar"?shoDetail.attributes.paymentSecurity_arabic:shoDetail.attributes.paymentSecurity}</span>
          </div>
         </div>
         */}
           {newColloction&&<Slider handle={newColloction.handle} key={newColloction.id} title={newColloction.title} products={newColloction.products}/>}
          {<BoxCollection bottomSection={bottomSection?bottomSection:{}}/>}
          {offersColloction&&<Slider handle={offersColloction.handle} key={offersColloction.id} title={offersColloction.title} products={offersColloction.products}/>}
          {sellingColloction&&<Slider handle={sellingColloction.handle} key={sellingColloction.id} title={sellingColloction.description} products={sellingColloction.products}/>}

      </div>
      <Policies/>
     {/* <div className='py-2'><hr/></div>
      <div className=' container mx-auto text-center mt-4 mb-8'>
      <div className='capitalize text-gray-900 text-3xl'>{t("common:about_us")}</div>
      <p className='text-gray-900 mx-4 mt-2 ' dangerouslySetInnerHTML={{__html:i18n.language==="ar"?shoDetail.attributes.aboutUs_arabic:shoDetail.attributes.aboutUs}}/>
        </div>*/}
    </div>
    </Layout>
  )
}

export async function getStaticProps({locale}) {

  try{
    const sellingColloction =await getCollectionByHande("selling",6,locale)
    const newColloction  =await getCollectionByHande("new",6,locale)
    const offersColloction =await getCollectionByHande("offers",6,locale)
    const panerSection=await getCollections("banner",4,locale)
    const topSection=await getCollections("topSection",3,locale)
    const bottomSection=await getCollections("bottomSection",2,locale)
    const pages=await getPages(locale)
    const page=await getPage(locale)
    const clothes=await getProductsType("clothes",locale)
    const shoes=await getProductsType("shoes",locale)
    const accessory=await getProductsType("accessories",locale)
    
     const adminrest=await productMetafiedAdmin()
     console.log("product metafied",adminrest)
        return {
          props: {
            sellingColloction:JSON.parse(sellingColloction)||{},
            newColloction:JSON.parse(newColloction)||{},
            offersColloction:JSON.parse(offersColloction)||{},
            panerSection:JSON.parse(panerSection)||{},
            topSection:JSON.parse(topSection)||{},
            bottomSection:JSON.parse(bottomSection)||{},
            pages:JSON.parse(pages)||[],
            page:JSON.parse(page)||[],
            productsTypes:{clothes:JSON.parse(clothes),shoes:JSON.parse(shoes),accessory:JSON.parse(accessory)},
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product","policies"]))
          }
        }
  }catch(err){
    console.log('error===>',err)
    return {
      props: {
        errMsg:true,
        ...(await serverSideTranslations(locale, ['common',"product","policies"]))
      }
    }
 }
}
export default Home;