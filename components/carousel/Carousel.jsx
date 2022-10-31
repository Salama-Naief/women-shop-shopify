import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion';
import {BsArrowLeft,BsArrowRight} from "react-icons/bs"
import Link from 'next/link';
import ProductCard from '../product/ProductCard';
import dynamic from 'next/dynamic';


 function Carousel({type,title,products}) {

   // const [width,setWidth]=useState(0);
    const [movedis,setMoveDis]=useState(0);
    const [numItems,setSetNumItems]=useState(0);
    const [route,setRoute]=useState(null);
    const [itemsLimit,setItemsLimit]=useState(0);
    const carousel=useRef();
    const carouselItem=useRef();

    useEffect(()=>{
      if(window.innerWidth<=480){
        setItemsLimit(2)
      }else if(window.innerWidth>480&&window.innerWidth<720){
        setItemsLimit(3)
      }else if(window.innerWidth>=720){
       setItemsLimit(4)
      }
    },[itemsLimit,numItems])

  useEffect(()=>{
    if(type==="new"||type==="sales"||type==="popular"){
     setRoute(`${type}-products`)
    }else if(type==="related"||type==="recentViewed"){
     setRoute(`all-${(products.length>0)&&(products[0].attributes?products[0].attributes.genre:products[0].genre)}`)
    }
 },[type,products,route])

 //handle move to right
  const handleRight=()=>{

      if(products.length>itemsLimit&&numItems>=0&&numItems<(products.length-itemsLimit)){
        setMoveDis(movedis+carouselItem.current.offsetWidth)
        setSetNumItems(numItems+1)
        }
    }
  //handle move to left
    const handleLeft=()=>{
      if(products.length>itemsLimit&&numItems>0){
        setMoveDis(movedis-carouselItem.current.offsetWidth)
        setSetNumItems(numItems-1)
    }
}
  return (
    <div  className=' my-4 container mx-auto'>
        <div className="my-4 flex justify-center">
            <div className="text-center w-full my-4">
              <div className="capitalize text-3xl ">{title?title:""}</div>
            </div>    
        </div>
      <motion.div ref={carousel} className=" overflow-hidden relative">
      {
          <motion.div initial={{opacity:0,display:"none"}} animate={(numItems>0)?{opacity:1,display:"block"}:{opacity:0,display:"none"}} transition={{duration:0.5}} onClick={()=>handleLeft()} className="absolute top-1/2 left-0 z-10 cursor-pointer">
             <BsArrowLeft className='text-secondary text-4xl'/>
          </motion.div>
          }
          {
          <motion.div initial={{opacity:0,display:"none"}} animate={((products.length-itemsLimit)>numItems)?{opacity:1,display:"block"}:{opacity:0,display:"none"}} transition={{duration:0.5}} onClick={()=>handleRight()} className="absolute top-1/2 -right-0.5 z-10 cursor-pointer">
             <BsArrowRight className='text-secondary text-4xl'/>
          </motion.div>
          }
         <motion.div animate={{x:-movedis}} transition={{duration:1,type:"tween"}} className='flex'>
        
          {products&&products.map((product,index)=>(
              <div key={index} ref={carouselItem} className="md:w-1/3 lg:w-1/4 w-1/2">
                <ProductCard key={product.id}  product={product.attributes?product.attributes:product}/>
              </div>
            ))}
         </motion.div>
      </motion.div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Carousel), { ssr: false });