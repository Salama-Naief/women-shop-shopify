import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { API_URL } from "../../utils/url";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from "react";


const Banner =({panerSection})=>{

  const {t,i18n} =useTranslation()
  const [title,setTitle]=useState("");
 useEffect(()=>{
   const _title=panerSection.title?panerSection.title.replace(/banner/g, ""):""
   setTitle(_title)
 },[panerSection])
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      arrows:false
    };
    
  return(
    <div className="" >
    
     <Slider {...settings} className="" >
        {panerSection.edges.length>0&&panerSection.edges.map((collection)=>(
          <div key={collection.node.id} className="relative z-10 justify-center " >
            <div className="w-full h-1/2 overflow-hidden">
              <Image src={collection.node.image.url} width={32} height={14} loading="eager" objectPosition={"center"} layout="responsive" priority alt=""/>
            </div>
            <div className="absolute z-20 w-fit  md:w-max max-h-fit bg-white p-2  bottom-2 md:inset-y-1/4 right-5 md:inset-x-1/2">
              <div className="border-2 border-gray-400 p-4 md:pt-12 md:pb-6 text-center">
                  <div className="md:px-16 italic text-gray-900 md:text-3xl font-semibold py-2 md:py-4 capitaliz">{collection.node.title.replace(/banner/g, "")}</div>
                  <div className="md:px-16  text-gray-900 mb-4 hidden md:block">{collection.node.description}</div>
                 <Link href={`/collection/${collection.node.handle}`}><a><div className="bg-gradient-to-tr from-primary to-secondary text-white md:py-4 py-1 md:text-xl text-center w-full md:font-bold">{t("common:show_now")}</div></a></Link>
              </div>
            </div>
        </div>
        ))
        }
      </Slider>
    </div>
    )
}

export default dynamic(() => Promise.resolve(Banner), { ssr: false });