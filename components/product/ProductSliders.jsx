import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import {FlatTree, motion} from "framer-motion"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineFavoriteBorder,MdOutlineFavorite } from "react-icons/md";
import Link from "next/link";
import {API_URL} from "../../utils/url";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import {useTranslation} from "next-i18next";
import Stars from "../rating/Stars"

 function ProductSliders({productHover,images,id,handle,rateValue,numOfPeopleRated,title,variant}) {
    const router =useRouter();
    const {state,dispatch} =useContext(Store);
    const[nav1,setNav1]=useState(null)
    const[nav2,setNav2]=useState(null)
   const[productId,setProductId]=useState(images[0].node.id)
    const [imgHover,setImgHover]=useState(false);
   // const [productRate,setProductRate]=useState(product.rate)
    const [waitRes,setWaitRes]=useState(false)
    const [liked,setLiked]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const {t,i18n}=useTranslation();


//use Effect
useEffect(()=>{
  if(state.lovedItems&&state.lovedItems.filter(a=>a.id===variant.id).length>0){
    setLiked(true)
  }else{
    setLiked(false)
  }
},[state.lovedItems,variant])

     //add to cart function
     const handleAddToCart=()=>{
      const item=state.cart.cartItems.find(item=>item.id===variant.id)
      const qty=item?item.quantity+1:1;
      dispatch({type:"ADD_TO_CART",payload:{...variant,title:title,handle:handle,quantity:qty}})
      
    }
    
      //handle like and dislike
  const handleLike=async()=>{
    dispatch({type:"ADD_TO_LOVEDITEMS",payload:{...variant,handle:handle}})
  }
    

const handleDislike=()=>{
  dispatch({type:"REMOVE_LOVED_PRODUCT",payload:{...variant}})
}

  
    return (
      <motion.div className="w-full">
        <Slider
          asNavFor={nav2}
          lazyLoad={true}
          arrows={false}
          ref={slider => setNav1(slider)}
        >{images.map((img,index)=>(
          <div key={index} className="relative flex justify-center  overflow-hidden ">
            <div className="h-68 w-full overflow-hidden">
              <Link href={`/product/${handle}`}>
                <a onMouseEnter={()=>setImgHover(true)} onMouseLeave={()=>setImgHover(false)} className=" ">
                  <div className="md:h-72 h-48 w-full relative  overflow-hidden">
                      {<Image src={img.node.url} alt="" layout="fill" objectFit="cover" objectPosition={"center"} loading="eager"/>}
                      
                  </div>
                </a>
              </Link>
            </div>
          
           {productHover&&<div className="left-auto right-auto px-4 w-full absolute z-20 bottom-8">
             <motion.button initial={{display:"none"}}  animate={productHover?{display:"block"}:{display:"none"}} transition={{duration:0.3,type:"tween"}} onClick={()=>handleAddToCart()}  className={` w-full transition ease-in-out delay-0 duration-500 border border-primary bg-white text-primary hover:bg-primary py-2 hover:text-white uppercase `}>{t("product:add_to_card")}</motion.button>
           </div>}
        </div>
        ))
          
         }
        </Slider>
        <div className="flex justify-between items-center px-4 my-4">
            <div className=" uppercase text-sm text-third flex items-center"><Stars rate={rateValue}/><span className="hidden md:block">({numOfPeopleRated})</span> </div>
            <div className="flex items-center">
              
              {
                liked?(
                  <MdOutlineFavorite onClick={()=>handleDislike()} className="cursor-pointer text-xl text-secondary"/>
                ):(
                  <MdOutlineFavoriteBorder onClick={()=>handleLike()} className="cursor-pointer text-xl text-gray-800"/>
                )
              } 
            </div>
        </div>
        <Slider
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
          slidesToShow={images.length>4?4:images.length}
          swipeToSlide={true}
          focusOnSelect={true}
          className="px-4"
        >
          {images.map((img,index)=>(
            <div key={index} className="flex justify-center ">
                
                <div onClick={()=>setProductId(img.node.id)} className={`bg-white relative cursor-pointer h-7 w-7 overflow-hidden rounded-full border ${productId===img.node.id?"border-secondary":"border-gray-400"} p-0.5`}>
                    {<Image src={img.node.url} loading="eager" layout="fill" objectFit="contain" objectPosition="center" alt="" />}
                    
                </div>
            </div>
            ))
           }
        </Slider>
      </motion.div>
    );
  
}

export default dynamic(() => Promise.resolve(ProductSliders), { ssr: false });