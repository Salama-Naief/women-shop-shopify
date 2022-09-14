import { useContext, useEffect, useRef, useState } from 'react';
import { MdOutlineFavoriteBorder ,MdOutlineWifiCalling3} from 'react-icons/md';
import {TbTruckReturn,TbTruckDelivery} from 'react-icons/tb'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import clientTranslated,{createCheckout, getProductByHande, updateCheckout} from '../../lib/shopify';

import SingleProductSliders from '../../components/product/SingleProductSlider';
import Slider from "../../components/home/Slider";
import {API_URL} from "../../utils/connectionConfig";
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import Carousel from '../../components/carousel/Carousel';
import Loading from '../../components/loading/Loading';
import {useTranslation} from "next-i18next";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

 function SingleProduct ({product,errMsg}){
    const {state,dispatch}=useContext(Store);
    const {viewedCart}=state;
    const router=useRouter();
   const [qty,setQty]= useState(1);
   const [overlay,setOverlay]= useState(false);
   const [loading,setLoading]=useState(true);
   const [varientData,setVarientData]=useState({});
   const [varientData2,setVarientData2]=useState(product.variants);
   const [height,setHeight]=useState(0);
   const [variantSize,setVariantSize]=useState(product.variants.edges[0].node.selectedOptions[0].value)
   const [variantcolor,setVariantColor]=useState(product.variants.edges[0].node.selectedOptions[1].value)
   const [windosWidth,setWindowsWidth]=useState(0);
   const imgHight=useRef()
  const {t,i18n}=useTranslation()
   useEffect(()=>{
    console.log("product",product)
    setWindowsWidth(window.innerWidth)
    setHeight(imgHight.current?.offsetHeight)
    setLoading(false);
   // dispatch({type:"ADD_VIEWED_CARD",payload:product});
   },[imgHight,loading,product])
 
   useEffect(()=>{
    const variant= product.variants.edges.find(varient=>(varient.node.selectedOptions[0].value===variantSize)&&(varient.node.selectedOptions[1].value===variantcolor))
    setVarientData(variant.node)
    
   },[product.variants.edges,variantSize,variantcolor])
  
   //update cart
   const handleUpdate=()=>{
    const quantity= parseInt(qty);
    dispatch({type:"ADD_TO_CART",payload:{...varientData,title:product.title,handle:product.handle,quantity:quantity}})
  }

  // create checkout items
 const handleCheckout=async ()=>{
   const checkoutId=Cookies.get("checkoutId")?JSON.parse(Cookies.get("checkoutId")):null
   //const checkoutId=null

    try{
        if(checkoutId){

            const data=[{id:varientData.id,variantQuantity:parseInt(qty)}]
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
  //check data frist
  if(errMsg){
    return(
      <Layout>
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>{t("product:backend_err")}</div></div>  
    </Layout>
    )
  }

  
  //loading


 if(loading){
    return(
     <Layout title={`product-${product.title}`} desc={"product.meta_desc"} pages={[]}>
         <Loading/>
     </Layout>
    )
  }
    return(
        <Layout title={`product-${product.title}`} desc={"product.meta_desc"} pages={[]}>
            <div className="container relative  mx-auto my-4 h-fit font-serif">

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div ref={imgHight} className="col-span-1 h-full text-center">
                        {<SingleProductSliders type="product" img={varientData.image} variants={product.images.edges}/>}
                        <button className='my-4 border border-gray-400 w-1/2 py-4 font-semibold '><div className='flex items-center justify-center'><MdOutlineWifiCalling3 className='text-3xl '/><span className='mx-2'>{t("product:ask_expert")}</span></div></button>
                    </div>
                    <div className='col-span-1  py-4 mx-4  md:mx-8 overflow-y-auto overflow-x-hidden scroll-smooth' style={windosWidth>600?{height:`${height}px`}:{height:"auto"}}>
                        <div className='flex text-gray-400'>
                            <span><Link href="/"><a >Home</a></Link></span>
                            <span>/<Link href={`/products/${product.collections.edges[0].node.handle}`}><a>{product.collections.edges[0].node.title}</a></Link></span>
                            <span>/({product.title}) </span>
                        </div>
                        <div className="text-3xl py-4 font-bold">
                            {product.title}
                        </div>
                        <div className='py-2 text-gray-400'>{t("product:in_stock")}: <span className='text-gray-900'>{"product.numberInStock"} {t("product:in_stock")}</span></div>
                        <div className='py-2 text-gray-400'>{t("product:product_type")}: <span className='text-gray-900'>{product.productType}</span></div>
                        <div className='py-2 text-gray-400'>{"vendor"}: <span className='text-gray-900'>{product.vendor}</span></div>
                        <div className='flex justify-between'>
                            <div className={`py-4 text-3xl font-bold ${varientData.compareAtPrice?"line-through text-gray-400 decoration-secondary":"text-secondary"} `}>${varientData.priceV2.amount}</div>
                            {varientData.compareAtPrice&&<div className='py-4 text-3xl font-bold text-secondary'>${varientData.compareAtPrice.amount}</div>}
                        </div>

                        <p className='text-gray-700' dangerouslySetInnerHTML={{__html:product.description}}/>
                        <div className="text-gray-400 mt-8">{t("product:Color")} : <span className='text-gray-900'>{varientData.selectedOptions[1].value}</span></div>
                        <div className='flex my-2 overflow-x-auto scroll-smooth w-full'>
                            {
                                product.options[1].name==="Color"&&product.options[1].values.map((color,index)=>(
                                    <div key={index} onClick={()=>setVariantColor(color)} className={`${variantcolor===color?"bg-secondary text-white":"bg-white text-gray-900"} py-1 px-2 mx-2 shadow-lg cursor-pointer rounded-md`} >{color}</div>
                                    ))
                                    
                            }
                        </div>
                        <div className="w-20 h-32 shadow-lg relative hover:shadow-secondary transition ease-in-out delay-0 duration-400">
                        <Image  src={varientData.image.url} layout="fill" objectFit='contain' loading='eager' objectPosition="center" alt="" />
                        </div>
                        <div className="text-gray-400 mt-8 py-2">{t("product:Size")} : <span className='text-gray-900'>{varientData.selectedOptions[0].value}</span></div>
                        <div className='flex w-full py-1.5 overflow-x-auto scroll-smooth'>
                            {
                                product.options[0].name==="Size"&&product.options[0].values.map((size,index)=>(
                                    <div key={index} onClick={()=>setVariantSize(size)} className={`${variantSize===size?"bg-secondary text-white":"bg-white text-gray-900"} border mx-2 border-gray-400 py-2 px-8 w-fit shadow-lg hover:shadow-primary transition ease-in-out delay-0 duration-500 cursor-pointer`}>{size}</div>
                                    ))
                                    
                            }
                        </div>
                        
                        <div className="py-8 text-error">{t("product:Harry_up")} <span>{"product.numberInStock"}</span> {t("product:left")} </div>
                        <div className="md:flex ">
                        <div className="flex justify-between my-4 md:my-0">
                            <div className="border border-gray-400 p-4 w-fit flex justify-center mx-4">
                                <input type="number" onChange={(e)=>setQty(e.target.value)} className='text-xl outline-none w-12' value={qty} min={1} />
                            </div>
                            <button className="border border-gray-400 p-4 w-fit mx-4 flex md:hidden justify-center ">
                                <MdOutlineFavoriteBorder className='text-2xl'/>
                            </button>
                            </div>
                            <button onClick={()=>handleUpdate()} className="border border-primary bg-primary md:flex-grow text-white p-4 w-full flex justify-center text-xl ">
                                {t("product:add_to_card")}
                            </button>
                            <button className="transition ease-in-out delay-0 duration-400 hover:bg-secondary hover:text-white border border-gray-400 p-4 w-fit mx-4 md:flex hidden justify-center ">
                                <MdOutlineFavoriteBorder className='text-2xl'/>
                            </button>
                        </div>
                        <div className='md:px-4'>
                            
                        <button onClick={handleCheckout} className="my-8 transition ease-in-out delay-0 duration-400 hover:bg-primary hover:text-white border border-primary bg-white  text-gray-900 p-4 w-full flex justify-center text-xl ">
                            {t("product:buy_now")}
                        </button>
                       
                        </div>
                       
                        <div className="text-gray-400 my-4 py-2 text-xl font-semibold">{t("product:total")}: <span className=' mx-1 text-primary'>{varientData.priceV2.amount*qty}$</span></div>
                        {/*<div className="text-gray-500 my-4 py-2 text-sm"> 
                            <div className="flex items-center cursor-pointer">
                                <TbTruckDelivery className='text-3xl'/>
                                <span className='text-gray-900 font-semibold mx-2'>{i18n.language==="ar"?shoDetail.attributes.FreeShipping_arabic:shoDetail.attributes.FreeShipping}</span>
                            </div>
                            <p className='text-gray-400 mx-4 mt-2 cursor-pointer' dangerouslySetInnerHTML={{__html:i18n.language==="ar"?shoDetail.attributes.FreeShippingDatails_arabic:shoDetail.attributes.FreeShippingDatails}}/>

                        </div>
                        <div className="text-gray-500 my-4 py-2 text-sm"> 
                            <div className="flex items-center cursor-pointer">
                                <TbTruckReturn className='text-3xl'/>
                                <span className='text-gray-900 font-semibold mx-2'onClick={()=>{setOverlay(true)}}>{i18n.language==="ar"?shoDetail.attributes.freeReturn_arabic:shoDetail.attributes.FreeReturn}</span>
                            </div>
                            <div className='text-gray-400 mx-4 mt-2 cursor-pointer'onClick={()=>{setOverlay(true)}}>{t("product:read_more")}</div>
    </div>*/}
                    </div>
                </div>
            <div className="flex justify-center w-full px-4">
                    <div className="md:text-center my-4 md:w-2/3">
                            <div className='text-3xl text-gray-900'>{t("product:Discription")}</div>
                            <p className='text-gray-700 my-8' dangerouslySetInnerHTML={{__html:product.descriptionHtml}}/>

                    </div>
            </div>
           {/*} <div className=''>
                <div className='my-8'><hr/></div>
                {relatedProduct&& <Slider type="related" title={t("product:Related_Product")} products={relatedProduct}/>}
                {viewedCart.length>0&&<Carousel type="recentViewed" title={`Recent Viewed`} products={viewedCart}/>}
            </div>
            {
                overlay&&<div onClick={()=>setOverlay(false)} className='fixed opacity-90 w-screen z-30 h-screen top-0 left-0 flex justify-center items-center bg-stone-400'>
                    <div className="bg-white md:w-1/2 h-fit p-8  ">
                        <div className="text-3xl text-center ">Policy of Shipping&&Return </div>
                        <div className='text-gray-700 my-8'>
                        <p className='text-gray-900 mx-4 mt-2 cursor-pointer' dangerouslySetInnerHTML={{__html:i18n.language==="ar"?shoDetail.attributes.FreeReturnDtails_arabic:shoDetail.attributes.FreeReturnDtails}}/>
                        </div>
                    </div>
                </div>
           */ }
        </div>
        </Layout>
    )
}

/*export async function getStaticPaths ({locales}){
    const res = await fetch(`${API_URL}/api/products`)
    const data = await res.json()
   const paths=[]
   data.data.map(product=>{
          paths.push({params:{slug:product.attributes.slug},locale:locales[1]},{params:{slug:product.attributes.slug},locale:locales[0]})
    })

    return{
        paths,
        fallback:false
    }
}*/
export async function getServerSideProps(ctx) {

    try{
    const {slug} =ctx.params;
    const locale=ctx.locale;
    
    //const product= await clientTranslated(locale).client.product.fetchByHandle(slug)   
    const product= await getProductByHande(slug,locale)   
        return {
        props: {
          // product:JSON.parse(JSON.stringify(product))||[],
           product:product||{},
            errMsg:false,
            ...(await serverSideTranslations(locale, ['common',"product"]))
        },
        }
    }catch(err){
        return {
            props: {
               errMsg:true
            },
        }
    }
 
  }

export default SingleProduct;