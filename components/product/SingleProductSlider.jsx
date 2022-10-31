import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {motion} from "framer-motion"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "../../utils/url";
import { Offer } from "../../utils/Calc";
import Image from "next/image";
import dynamic from "next/dynamic";

//gid://shopify/ProductImage/38137280692443
//gid://shopify/ProductImage/38137280561371

 function SingleProductSliders(props) {
   const {productHover,type,variants,img}=props;
    const [nav1,setNav1]=useState(null)
    const [nav2,setNav2]=useState(null)
    const [productImg,setProudctImg]=useState(variants[0].node.url)
    const [product,setProduct]=useState(variants[0])
    const [slideIndex,setSlideIndex]=useState(0);
    

   



    useEffect(()=>{
    variants.map((imgs,index)=>{
        if(img.id===imgs.node.id){
        //setSlideIndex(index)
        nav2&&nav2.slickGoTo(index)
        }
  })
    },[nav2,img,slideIndex,variants])

    return (
      <div className="w-full">
        <Slider
          asNavFor={nav2}
          ref={slider => {setNav1(slider) }}
          arrows={false}
        >
           {
            variants&&variants.map((img)=>(
              <div key={img.node.id}  className="relative flex h-full justify-center  overflow-hidden bg-gray-100">
                <div className="absolute left-1 top-1">
                     {/*img.compareAtPrice&& <div className=" bg-secondary  rounded px-2 py-0.5  text-white">-{Offer(img.compareAtPrice,img.price)}%</div>*/}
                      <div className=" bg-primary my-1 rounded px-2 py-0.5  text-white">new</div>
                    </div>
                    
                    {<Image src={img.node.url} width={img.node.width} height={img.node.height} onMouseMoveCapture={()=>{setProudctImg(img.node.id); setProduct(img)}} layout="responsive" objectFit="contain" objectPosition="center" loading="eager" alt={"pImg.attributes.name"} className={`w-full h-full object-contain cursor-grab `} />}
            </div>
            ))
           }

        </Slider>
        <Slider
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
          slidesToShow={variants.length>5?5:variants.length}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
          className="px-10 my-6 "
        >
        {
            variants&&variants.map(img=>(
            <div key={img.node.id} className="flex justify-center ">
                
                <div onClick={()=>{setProudctImg(img.node.id);setProduct(img)}}  className={`relative bg-gray-100 w-10 h-10 md:w-16 md:h-16 overflow-hidden rounded-full border-2 ${productImg===img.node.id?"border-secondary":"border-gray-400"} p-0.5`}>
                    
                    <Image src={img.node.url} loading="eager" objectFit="contain" objectPosition="center" layout="fill" alt="" />
                </div>
            </div>
            ))}
        </Slider>
      </div>
    );
  
}

export default dynamic(() => Promise.resolve(SingleProductSliders), { ssr: false });