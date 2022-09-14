import Head from 'next/head';
import Image from 'next/image';
import HomePanner from "../components/home/Panner";
import Slider from '../components/home/Slider';
import BoxCollection from '../components/home/BoxCollection';
import {API_URL} from '../utils/connectionConfig';
import Layout from '../components/Layout';
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getCollectionByHande} from '../lib/shopify';
import { Store } from '../utils/Store';

 function Home({errMsg ,newColloction,womenColloction,menColloction}) {
  const router =useRouter();
  const {pathname,query,asPath}=router;
  const {state}=useContext(Store);
  //const [loading,setLoading]=useState(true);
  const {t,i18n}= useTranslation();
  const [saleCol,setSaleColection]=useState([]); 
  const [newCol,setNewColection]=useState([]); 
  const [womenCol,setWomanColection]=useState([]); 
  const [menCol,setMenColection]=useState([]); 
  const [topCollection,setTopColection]=useState([]); 
  const [carousal,setCarousal]=useState([]); 

 




  /*useEffect(()=>{

    setNewColection(newColloction)
    setWomanColection(womenColloction)
    //setSaleColection(saleColloction)
    setMenColection(menColloction)
    //console.log("SaleColloction",saleColloction)
    //console.log("newColloction",newColloction)
    //console.log("womenColloction",womenColloction)
    console.log("state",state)
  
  },[])*/
  
   useEffect(()=>{
    router.push({pathname,query},asPath,{locale:i18n.language})
  },[i18n.language, router,pathname,query,asPath])



  //error
  if(errMsg){
    return(
      <Layout title="error page">
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
    <Layout title="homePage" t={t} desc="homePage" pages={[]}>
    <div className='scroll-smooth'>
      <div className="h-fit ">
        {/**  <HomePanner carousal={carousal?carousal:[]}/>                                                                
         <BoxCollection topCollection={topCollection?topCollection:[]}/>
         <div className='grid md:grid-cols-3 container mx-auto  mt-4'>
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
          {/*<BoxCollection bottomCollection={bottomCollection?bottomCollection:[]}/>*/}
          {womenColloction&&<Slider handle={womenColloction.handle} key={womenColloction.id} title={womenColloction.title} products={womenColloction.products}/>}
          {menColloction&&<Slider handle={menColloction.handle} key={menColloction.id} title={menColloction.title} products={menColloction.products}/>}

      </div>
     {/* <div className='py-2'><hr/></div>
      <div className=' container mx-auto text-center mt-4 mb-8'>
      <div className='capitalize text-gray-900 text-3xl'>{t("common:about_us")}</div>
      <p className='text-gray-900 mx-4 mt-2 ' dangerouslySetInnerHTML={{__html:i18n.language==="ar"?shoDetail.attributes.aboutUs_arabic:shoDetail.attributes.aboutUs}}/>
        </div>*/}
    </div>
    </Layout>
  )
}

export async function getServerSideProps({locale}) {
  
  try{
    const uppaerLocale=locale;

    
  //  const SaleColloction =await getCollectionByHande("sale",6,locale)
  //  const newColloction =await getCollectionByHande("new",6,locale)
   // const womenColloction =await getCollectionByHande("women",6,locale)
   // const menColloction =await getCollectionByHande("men",6,locale)
    
   
    


        return {
          props: {
            saleColloction:SaleColloction||{},
            newColloction:newColloction||{},
            menColloction:menColloction||{},
            womenColloction:womenColloction||{},
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product"]))
          }
        }
  }catch(err){
    console.log("error ==>",err)
    return {
      props: {
        errMsg:true,
        ...(await serverSideTranslations(locale, ['common',"product"]))
      }
    }
 }
}
export default Home;