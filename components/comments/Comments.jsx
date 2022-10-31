import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../product/ProductCard";
import {  MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {BsArrowLeft,BsArrowRight} from "react-icons/bs"

import Link from "next/link";
import { useEffect ,useState} from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Comment from "./Comment"
// arrows
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (         
     <BsArrowRight className={`z-10 absolute top-1/2 right-0 md:-right-1 cursor-pointer text-secondary text-3xl md:text-5xl`} style={{ ...style, display: "block" }} onClick={onClick}/>
    );
  }
  //arrows
  function SampleprevArrow(props) {
    const { className, style, onClick } = props;
    return (
    <BsArrowLeft className={`z-10 absolute top-1/2 left-0 md:-left-1 cursor-pointer text-secondary text-3xl md:text-5xl`} style={{ ...style, display: "block" }} onClick={onClick}/>
    );
  }

  // main function
 function Comments({comments}){

const [route,setRoute]=useState(null);
const {t}=useTranslation();

    const settings = {
      
        infinite: true,
        slidesToShow:comments.length>3?3:comments.length,
        slidesToScroll: 1,
        speed: 1000,
        cssEase: "linear",
        arrows:true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleprevArrow />,
        responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows:true,
                    autoplay: true,
                    speed: 1000,
                   nextArrow: <SampleNextArrow />,
                   prevArrow: <SampleprevArrow />,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:true,
                   nextArrow: <SampleNextArrow />,
                   prevArrow: <SampleprevArrow />,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:true
                  }
                }
              ]
              
    
      };

    return(
        <div className="relative my-10 font-serif container mx-auto ">

           <Slider {...settings} className="">
            {
          
              comments.length>0&&comments.map((comment,index)=>(
              <div key={index} className="w-1/4">
                <Comment  comment={comment.node.value}/>
              </div>
            ))
            
           }
           </Slider>

        </div>
    )
}

export default dynamic(() => Promise.resolve(Comments), { ssr: false });