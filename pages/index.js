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
import { getCollectionByHande, getCollections, getPages} from '../lib/shopify';
import { Store } from '../utils/Store';
import Policies from '../components/utils/Policies';
import { mutationTest, productMetafiedAdmin } from '../lib/shopifyAdmin';




 function Home({errMsg ,pages,newColloction,bottomSection,topSection,panerSection,sellingColloction,offersColloction}) {
  
  const router =useRouter();
  const {pathname,query,asPath}=router;
  const {t,i18n}= useTranslation();
 

 
  
   useEffect(()=>{
    router.push({pathname,query},asPath,{locale:i18n.language})
  },[i18n.language])


  //error
  if(errMsg){
    return(
      <Layout  title="error page">
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>error in back end connection</div></div>  
    </Layout>
    )
  }

  
 
  return (
    <Layout title="home page"  pages={pages&&pages} desc="home page" >
    <div className='scroll-smooth'>
      <div className="h-fit ">
        <HomeBanner panerSection={panerSection?panerSection:{}}/>                                                            
         <BoxCollection topSection={topSection?topSection:{}}/>
           {newColloction&&<Slider handle={newColloction.handle} key={newColloction.id} title={newColloction.title} products={newColloction.products}/>}
          {<BoxCollection bottomSection={bottomSection?bottomSection:{}}/>}
          {offersColloction&&<Slider handle={offersColloction.handle} key={offersColloction.id} title={offersColloction.title} products={offersColloction.products}/>}
          {sellingColloction&&<Slider handle={sellingColloction.handle} key={sellingColloction.id} title={sellingColloction.description} products={sellingColloction.products}/>}

      </div>
      <Policies/>
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


        return {
          props: {
            sellingColloction:sellingColloction?JSON.parse(sellingColloction):{},
            newColloction:newColloction?JSON.parse(newColloction):{},
            offersColloction:offersColloction?JSON.parse(offersColloction):{},
            panerSection:panerSection?JSON.parse(panerSection):{},
            topSection:topSection?JSON.parse(topSection):{},
            bottomSection:bottomSection?JSON.parse(bottomSection):{},
            pages:pages?JSON.parse(pages):[],
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product","policies"]))
          }
        }
  }catch(err){
    return {
      props: {
        errMsg:true,
        ...(await serverSideTranslations(locale, ['common',"product","policies"]))
      }
    }
 }
}
export default Home;