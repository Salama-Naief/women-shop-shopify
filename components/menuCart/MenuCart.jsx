import { motion } from 'framer-motion';
import Link from "next/link"
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineClear } from "react-icons/md"
import { Store } from '../../utils/Store';
import { useTranslation } from "next-i18next"
import { API_URL } from '../../utils/connectionConfig';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { createCheckout, updateCheckout } from '../../lib/shopify';
import { useRouter } from 'next/router';

function MenuCart({setMenuCart}) {
    const {state,dispatch}=useContext(Store);
    const router=useRouter();
    const {t,i18n}=useTranslation();
    const [cartProduct,setCartProduct]=useState([]);
    useEffect(()=>{
        setCartProduct(state.cart.cartItems)
    },[state])

    const handleUpdate=(qty,product)=>{
      const quantity= parseInt(qty);
      dispatch({type:"ADD_TO_CART",payload:{...product,quantity:quantity}})
    }

    const handleRemoceCart=(product)=>{
      dispatch({type:"REMOVE_FROM_CART",payload:{...product}})
    }

    const handleCheckout= async ()=>{
      const checkoutId=Cookies.get("checkoutId")?JSON.parse(Cookies.get("checkoutId")):null
      //const checkoutId=null

       try{
        const data=[]
        state.cart.cartItems.length>0&&state.cart.cartItems.map(item=>{

          data.push({id:item.id,variantQuantity:parseInt(item.quantity)})
        })
        console.log("state.cart.cartItems",data)
           if(checkoutId){
          
               const res=  await updateCheckout(data,checkoutId) 
               console.log("update checkout",res)
               router.push(res.webUrl)
           }else{
               const data=[{id:varientData.id,variantQuantity:parseInt(qty)}]
               const res=  await createCheckout(data) 
               Cookies.set("checkoutId",JSON.stringify(res.id))
               console.log("create checkout",res)
               router.push(res.webUrl)
           }
       }catch(err){
           console.log("check out err",err)
       }
    }
  return (
    
        <motion.div initial={{x:i18n.language==="ar"?-400:400,display:"none"}} animate={{x:0,display:"block"}}  transition={{duration:0.2,type:"just"}} className={`${i18n.language==="ar"?"left-0":"right-0"} z-50 bg-white text-gray-900 fixed bottom-0 w-5/6 md:w-1/3  h-full border border-gray-400 px-8`}>
        <div className="">
          <div className={`${i18n.language==="ar"?"right-5":"left-5"} absolute top-5 text-xl md:text-2xl md:p-1 p-0.5 border border-secondary rounded-full cursor-pointer`} onClick={()=>setMenuCart(false)}><MdOutlineClear/></div>
          <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">{t("common:product_cart")}</div>
         {cartProduct.length<=0&& <div className="text-error  w-full text-center ">{t("common:no_product_in_cart")} </div>}
        </div>
        {cartProduct.length>0&&<div className="overflow-y-auto overflow-x-hidden h-2/3 scroll-smooth scroll-m-0 scroll-p-0 mt-4">
        {cartProduct.length>0&&cartProduct.map(product=>(
            <div key={product.id} className="border border-gray-400 relative p-1 my-2">
                <div className={`${i18n.language==="ar"?"left-0.5 md:left-1":"right-0.5 md:right-1"}  absolute md:top-1 top-0.5  text-gray-900 border border-secondary rounded-full cursor-pointer`} onClick={()=>handleRemoceCart(product)}><MdOutlineClear/></div>
              <div className="flex">
                <Link href={`/product/${product.handle}`} passHref>            
                  <div className="w-1/3 h-24 overflow-hidden relative cursor-pointer">
                    <Image src={product.image.url} objectFit="contain" objectPosition={"center"} layout="fill" loading='eager'  alt={product.title}/>      
                </div>               
                </Link>
                
                <div className="flex w-2/3 px-4 items-center justify-between">
                <div className="flex text-gray-900 flex-col items-between">
                  <Link href={`/product/${product.handle}`} passHref>
                    <a>
                      <div className="py-1 flex items-center text-sm">
                        <span className="mx-1 text-gray-400">name:</span>
                        <span className="text-sm">{product.title}</span>
                      </div>
                    </a>
                  </Link>
                    
                    <div className="py-1 flex items-center text-sm">
                      <span className="mx-1 text-gray-400">color:</span>
                      <span className="text-sm">{product.selectedOptions[1].value}</span>
                    </div>
                    <div className="py-1 flex items-center text-sm">
                      <span className="mx-1 text-gray-400">size:</span>
                      <span className="">{product.selectedOptions[0].value}</span>
                    </div>
                </div>
                <div className="justify-end flex flex-col items-end h-full">
                  
                    <input value={product.quantity} onChange={e=>handleUpdate(e.target.value,product)} type="number" className="outline-none w-10 px-1 md:my-4 my-1 text-gray-900 border border-gray-400"/>
                    <div className="py-2 text-secondary ">${product.priceV2.amount}</div>
                </div>
                </div>
              </div>
            </div>
        ))}
        
        </div>
       }
        <div className="flex justify-between px-4 text-gray-900 p-2 border border-gray-400 mt-6 mb-4"><div >{t("common:Subtotal")} <span className="text-secondary mx-0.5">({cartProduct.reduce((a,c)=>a+c.quantity,0)})</span>{t("common:items")}</div> <div>{t("common:total_Price")}:$<span className="text-secondary mx-0.5">{cartProduct.reduce((a,c)=>a+c.quantity*(c.priceV2.amount),0)}</span></div></div>
          <button onClick={()=>handleCheckout()} className="bg-primary py-2 w-full text-white mb-4 uppercase">{t("common:chechout")}</button>
        </motion.div>
      
  )
}

export default dynamic(() => Promise.resolve(MenuCart), { ssr: false });