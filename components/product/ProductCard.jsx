
import { useContext, useState } from "react"
import Link from 'next/link';
import ProductSliders from "./ProductSliders"
import { Offer } from "../../utils/Calc";
import { Store } from "../../utils/Store";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";


 function ProductCard({product}){
    const {state,dispatch}=useContext(Store);
    const [productHover,setProductHover]= useState(false)
    const {i18n}=useTranslation();
    //const newItem=new Date().getMonth()-new Date(product.createdAt).getMonth()


    const handleViewedCart=()=>{
        
    }
 
    return(
        <div className={``} style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
           {!product?( <div className="bg-gray-100 h-80  flex justify-center items-center border border-gray-400">
                <div className="text-secondary">Looding..</div>
            </div>):(
             <div onClick={()=>handleViewedCart()} className="relative h-fit border mx-1 md:mx-4 font-serif" onMouseEnter={()=>setProductHover(true)} onMouseLeave={()=>setProductHover(false)}>
                <ProductSliders productHover={productHover} title={product.title} variant={product.variants.edges[0].node} handle={product.handle} id={product.id} images={product.images.edges} name={product.vendor}/>
                    <div className="px-4">
                        <div className="absolute left-1 top-1">
                            {product.variants.edges[0].node.compareAtPriceV2&&<div className=" bg-secondary  rounded  text-sm md:text-base px-1 md:px-2  md:py-0.5  text-white">-{Offer(product.variants.edges[0].node.compareAtPriceV2.amount,product.variants.edges[0].node.priceV2.amount)}%</div>}
                            <div className={`${true?"bg-primary":"bg-gray-900"} text-sm md:text-base   my-1 rounded px-1 md:px-2 md:py-0.5  text-white`}>{true?"new":"bundle"}</div>
                        </div>
                    <Link href={`/product/${product.handle}`}>
                            <a>
                                
                                <div className="truncate " dangerouslySetInnerHTML={{__html:product.descriptionHtml}}/>
                                <div className=" flex justify-between my-1">
                                <div className={`font-medium md:font-bold pb-2 ${product.variants.edges[0].node.compareAtPriceV2===null?"text-gray-900":"text-gray-500 line-through"}`}><span className="text-sm font-normal">{product.variants.edges[0].node.priceV2.currencyCode}</span> <span>{`${product.variants.edges[0].node.priceV2.amount}`}</span>  </div>
                               { product.variants.edges[0].node.compareAtPriceV2&&<div className="font-medium md:font-bold pb-2 text-secondary"><span className="text-sm font-normal">{product.variants.edges[0].node.compareAtPriceV2.currencyCode}</span> <span>{`${product.variants.edges[0].node.compareAtPriceV2.amount}`}</span> </div>}
                                </div>
                            </a>
                        </Link> 
                    </div>
                </div>
            )
           }
        </div>
           
        
    )
}


export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });