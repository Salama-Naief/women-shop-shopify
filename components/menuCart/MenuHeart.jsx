import { motion } from 'framer-motion';
import Link from "next/link"
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineClear } from "react-icons/md"
import { Store } from '../../utils/Store';
import { useTranslation } from "next-i18next"
import { API_URL } from '../../utils/url';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { createCheckout, updateCheckout } from '../../lib/shopify';
import { useRouter } from 'next/router';

function MenuCart({setMenuHeart}) {
    const {state,dispatch}=useContext(Store);
    const router=useRouter();
    const {t,i18n}=useTranslation();
    const [lovedProduct,setLovedProduct]=useState([]);
    useEffect(()=>{
        setLovedProduct(state.lovedItems)
    },[state])


    const handleRemoceCart=(product)=>{
      dispatch({type:"REMOVE_LOVED_PRODUCT",payload:{...product}})
    }

  return (
    
        <motion.div initial={{x:i18n.language==="ar"?-400:400,display:"none"}} animate={{x:0,display:"block"}}  transition={{duration:0.2,type:"just"}} className={`${i18n.language==="ar"?"left-0":"right-0"} z-50 bg-white text-gray-900 fixed bottom-0 w-3/4 md:w-1/6  h-full border border-gray-400 px-8 overflow-y-auto overflow-x-hidden scroll-smooth`}>
        <div className="">
          <div className={`${i18n.language==="ar"?"right-5":"left-5"} absolute top-5 text-xl md:text-xl  border border-secondary rounded-full cursor-pointer`} onClick={()=>setMenuHeart(false)}><motion.span animate={{rotate:360}} whileHover={{rotate:360}}><MdOutlineClear/></motion.span></div>
          <div className="text-gray-900 text-xl md:text-xl w-full text-center my-6">{t("common:product_cart")}</div>
         {lovedProduct.length<=0&& <div className="text-error  w-full text-center ">{t("common:no_product_in_cart")} </div>}
        </div>
        {lovedProduct.length>0&&<div className=" mt-4">
        {lovedProduct.length>0&&lovedProduct.map(product=>(
            <div key={product.id} className=" relative  my-2">
                <div className={`${i18n.language==="ar"?"left-0.5 md:left-1":"right-0.5 md:right-1"} z-10 absolute md:top-1 top-0.5  text-gray-900 border border-secondary rounded-full cursor-pointer`} onClick={()=>handleRemoceCart(product)}><MdOutlineClear/></div>
              <div className="flex">
                <Link href={`/product/${product.handle}`} passHref>            
                  <div className="w-full h-24 overflow-hidden relative cursor-pointer">
                    <Image src={product.image.url} objectFit="contain" objectPosition={"center"} layout="fill" loading='eager'  alt={product.title}/>      
                </div>               
                </Link>
              </div>
            </div>
        ))}
        
        </div>
       }

        </motion.div>
      
  )
}

export default dynamic(() => Promise.resolve(MenuCart), { ssr: false });