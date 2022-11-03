import { useContext, useEffect, useRef, useState } from 'react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder ,MdOutlineWifiCalling3} from 'react-icons/md';
import {TbTruckReturn,TbTruckDelivery} from 'react-icons/tb'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import {createCheckout, getPages, getProductByHande, getProductRecommended, getProducts, getProductsHandle, products, updateCheckout} from '../../lib/shopify';

import SingleProductSliders from '../../components/product/SingleProductSlider';
import Slider from "../../components/home/Slider";
import {API_URL} from "../../utils/url";
import { Store } from '../../utils/Store';
import Layout from '../../components/utils/Layout';
import Carousel from '../../components/carousel/Carousel';
import Loading from '../../components/loading/Loading';
import {useTranslation} from "next-i18next";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {data} from "../../utils/productPolicy";
import { createComment } from '../../lib/shopifyAdmin';
import axios from 'axios';
import { MdOutlineMail,MdPersonOutline } from 'react-icons/md';
import Stars from '../../components/rating/Stars';
import Comments from '../../components/comments/Comments';
import SetStars from '../../components/utils/SetStars';
import SmallLoader from '../../components/loading/SmallLoader';


 function SingleProduct ({product,commentsData,recomendedProducts,rateData,errMsg,pages}){
    const {state,dispatch}=useContext(Store);
    const {viewedCart}=state;
    const router =useRouter();
  const {pathname,query,asPath}=router;
   const [qty,setQty]= useState(1);
   const [overlay,setOverlay]= useState(false);
   const [loading,setLoading]=useState(true);
   const [varientData,setVarientData]=useState(product&&product.variants.edges[0].node);
   //const [varientData2,setVarientData2]=useState(product?product.variants:[]);
   const [height,setHeight]=useState(0);
   const [variantSize,setVariantSize]=useState("")
   const [variantcolor,setVariantColor]=useState("")
   const [windosWidth,setWindowsWidth]=useState(0);
   const [productRecommended,setProductRecommended]=useState([]);
   const [liked,setLiked]=useState(false)
   const imgHight=useRef()
  const {t,i18n}=useTranslation();
  const [commentLoading,setCommentLoading]=useState(false);
  const [commentMessage,setCommentMessage]=useState("");
  const [commentErrorMessage,setCommentErrorMessage]=useState("");
  const [comments,setComments]=useState(commentsData?commentsData:[]);
  const [rateId,setRateId]=useState(rateData?rateData.rateId:0);
  const [rateValue,setRateValue]=useState(rateData?rateData.rateValue:0);
  const [numOfPeopleRated,setNumOfPeopleRated]=useState(rateData?rateData.numOfPeopleRated:0);
  const [rate,setRate]=useState(5);

  const [checkoutLoading,setCheckoutLoading]=useState(false);
  const [checkoutErrMessage,setCheckoutErrMessage]=useState("");
  //comment varaible
  const name=useRef();
  const email=useRef();
  const message=useRef();

  console.log("pages",pages)
      useEffect(()=>{
        router.push({pathname,query},asPath,{locale:i18n.language})
      },[i18n.language])

useEffect(()=>{
    setComments(commentsData?commentsData:[])
    setRateId(rateData?rateData.rateId:0)
    setRateValue(rateData?rateData.rateValue:0)
    setNumOfPeopleRated(rateData?rateData.numOfPeopleRated:0)
},[commentsData,rateData])

useEffect(()=>{
  setTimeout(()=>{
    setCommentErrorMessage("")
    setCommentMessage("")
  },5000)
},[commentErrorMessage,commentMessage])

   useEffect(()=>{
    setWindowsWidth(window.innerWidth)
    setHeight(imgHight.current?.offsetHeight)
    setLoading(false);
    dispatch({type:"ADD_VIEWED_CARD",payload:product});
   },[imgHight,loading,product])
 
   useEffect(()=>{
    if(product&&product.variants.edges[0]){
        setVarientData(product.variants.edges[0].node)
        if(product.variants.edges[0].node.selectedOptions[1]){
            setVariantSize(product.variants.edges[0].node.selectedOptions[1].value)
            setVariantColor(product.variants.edges[0].node.selectedOptions[0].value)
        }else{
            setVariantSize("varient size")
            setVariantColor(product.variants.edges[0].node.selectedOptions[0].value)
        }

    }


   },[product])
 

const handleChangeVarients=(type,value)=>{
    let variant=null
    if(product.variants.edges[0].node.selectedOptions[1]){
        if(type==="color"){
         variant=product.variants.edges.find(varient=>(varient.node.selectedOptions[1].value===variantSize)&&(varient.node.selectedOptions[0].value===value))
         setVariantColor(value)
        }else if(type==="size"){
        variant=product.variants.edges.find(varient=>(varient.node.selectedOptions[1].value===value)&&(varient.node.selectedOptions[0].value===variantcolor))
        setVariantSize(value)
    }
    }else{
        variant=product.variants.edges.find(varient=>varient.node.selectedOptions[0].value===value)
        setVariantColor(value)
    }
    
    if(variant){
        setVarientData(variant.node)
    }

}
   //getRecomended products
   useEffect(()=>{
        setProductRecommended(recomendedProducts)

   },[recomendedProducts])


   
//use Effect
useEffect(()=>{
    if(state.lovedItems&&state.lovedItems.filter(a=>a.id===varientData.id).length>0){
      setLiked(true)
    }else{
      setLiked(false)
    }
  },[state.lovedItems,varientData])
    
        //handle like and dislike
    const handleLike=async()=>{
      dispatch({type:"ADD_TO_LOVEDITEMS",payload:{...varientData,handle:product.handle}})
    }
      
  
  const handleDislike=()=>{
    dispatch({type:"REMOVE_LOVED_PRODUCT",payload:{...varientData}})
  }

   const handleQty=(type)=>{
    if(type==="increase"){
       setQty(parseInt(qty)+1)
    }else if(type==="decrease"){
        if(qty>1){
            setQty((qty)-1)
        }
    }
   }
   //update cart
   const handleUpdate=()=>{
    const quantity= parseInt(qty);
    dispatch({type:"ADD_TO_CART",payload:{...varientData,title:product.title,handle:product.handle,quantity:quantity}})
  }

  // create checkout items
 const handleCheckout=async ()=>{

   const checkoutId=Cookies.get("checkoutId")?JSON.parse(Cookies.get("checkoutId")):null

         const data=[{id:varientData.id,variantQuantity:parseFloat(qty)}]
     
        const url=`${API_URL}/checkout`
        const options={

                 endpoint: url,
                 method: "POST",
                 headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ data,checkoutId })
      }
      setCheckoutLoading(true)
      const res = await fetch(url, options)
      const resData=await res.json();

      if(resData.checkoutCreate&&resData.checkoutCreate.checkout){
       Cookies.set("checkoutId",JSON.stringify(resData.checkoutCreate.checkout.id))
       setCheckoutLoading(false)
       router.push(resData.checkoutCreate.checkout.webUrl)
      }else if(resData.checkoutLineItemsReplace&&resData.checkoutLineItemsReplace.checkout){
       Cookies.set("checkoutId",JSON.stringify(resData.checkoutLineItemsReplace.checkout.id))
       setCheckoutLoading(false)
       router.push(resData.checkoutLineItemsReplace.checkout.webUrl)
      }else if(resData.checkoutUserErrors){
        setCheckoutErrMessage(resData.checkoutUserErrors[0].message)
       setCheckoutLoading(false)
      }else if(resData.userErrors){
       setCheckoutErrMessage(resData.userErrors[0].message)
       setCheckoutLoading(false)
      }
     
    
   
 }


 // hande comment
 const handleComment=async(e)=>{
    e.preventDefault();
    setCommentLoading(true);
   
    if(name.current.value.trim()!==""&&email.current.value.trim()!==""&&message.current.value.trim()!==""){
    const data=name.current.value+"-"+email.current.value+"-"+rate+"-"+message.current.value;
    const URL = `${API_URL}/commentMutation`
    const rateURL = `${API_URL}/updateRate`
    const rateAvarge=parseFloat(rateValue)>0?((parseFloat(rateValue)+parseInt(rate))/2):rate
     
    const rateValues=rateAvarge+"-"+(parseInt(numOfPeopleRated)+1)
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId:product.id,comment:data })
    }

    const rateOptions = {
        endpoint: rateURL,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId:product.id,rateId:rateId ,rate:rateValues})
      }
    const res = await fetch(URL, options).then(response => {
        return response.json()
      })

      const rateRes = await fetch(rateURL, rateOptions).then(response => {
        return response.json()
      })
      if(rateRes.userErrors.length>0||res.userErrors.length>0){
        setCommentErrorMessage(t("product:comment_error_message"))
        setCommentLoading(false)
      }

    if(rateRes.product.metafields.edges.length>0){
              rateRes.product.metafields.edges.map(item=>{
                  if(item.node.namespace==="rate"){
                      const value=item.node.value.split("-");     
                      setRateId(item.node.id)
                      setRateValue(value[0]?value[0]:0)
                      setNumOfPeopleRated(value[1]?value[1]:0)
                      
                    }
                    
                })
                setCommentMessage(t("product:comment_success_message"))
                setCommentLoading(false)
            }
            
    }else{
        setCommentErrorMessage(t("product:fill_all_fields"))
        setCommentLoading(false)
    }

 }
  //check data frist
  if(errMsg){
    return(
      <Layout title={"error"} pages={pages}>
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>{t("product:backend_err")}</div></div>  
    </Layout>
    )
  }

  
  //loading


 if(loading){
    return(
     <Layout title={`product-${product.title}`} desc={"product.meta_desc"}  pages={pages}>
         <Loading/>
     </Layout>
    )
  }
    return(
        <Layout title={`product-${product.title}`} desc={"product.meta_desc"}  pages={pages}>
            <div className="container relative  mx-auto my-4 h-fit ">

                <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                    <div ref={imgHight} className="col-span-1 h-full text-center">
                        {<SingleProductSliders type="product" img={varientData.image} variants={product.images.edges}/>}
                        <button className='my-4 border border-gray-400 w-1/2 py-4 font-semibold '><div className='flex items-center justify-center'><MdOutlineWifiCalling3 className='text-3xl '/><span className='mx-2'>{t("product:ask_expert")}</span></div></button>
                    </div>
                    <div className='col-span-1  py-4 mx-4  md:mx-8 overflow-y-auto overflow-x-hidden scroll-smooth' style={windosWidth>600?{height:`${height}px`}:{height:"auto"}}>
                        <div className='flex text-gray-400'>
                            <span><Link href="/"><a >Home</a></Link></span>
                            <span>/<Link href={`/collection/${product.collections.edges[0].node.handle}`}><a>{product.collections.edges[0].node.title}</a></Link></span>
                            <span>/({product.title}) </span>
                        </div>
                        <div className="text-3xl py-4 font-bold">
                            {product.title}
                        </div>

                        <div className='py-2 text-gray-400 flex items-center'>{t("product:rate")} <Stars rate={parseFloat(rateValue)}/> <span className='text-gray-900'>({parseFloat(numOfPeopleRated)})</span></div>
                        <div className='py-2 text-gray-400'>{t("product:product_type")}: <span className='text-gray-900'>{product.productType}</span></div>
                        <div className='py-2 text-gray-400'>{t("product:ventor")}: <span className='text-gray-900'>{product.vendor}</span></div>
                        <div className='flex justify-between'>
                            <div className={`py-4 text-3xl font-bold ${varientData.compareAtPrice?"line-through text-gray-400 decoration-secondary":"text-secondary"} `}>${varientData.priceV2.amount}</div>
                            {varientData.compareAtPrice&&<div className='py-4 text-3xl font-bold text-secondary'>${varientData.compareAtPrice.amount}</div>}
                        </div>

                        <p className='text-gray-700' dangerouslySetInnerHTML={{__html:product.descriptionHtml}}/>
                        <div className="text-gray-400 mt-8">{t("product:Color")} : <span className='text-gray-900'>{varientData.selectedOptions[0].value}</span></div>
                        <div className='flex flex-wrap my-2 overflow-x-auto scroll-smooth w-full'>
                            {
                               product.options[0].name==="Color"&&product.options[0].values.map((color,index)=>(
                                    <div key={index} onClick={()=>handleChangeVarients("color",color)} className={`${variantcolor===color?"bg-secondary text-white":"bg-white text-gray-900"} py-1 px-2 m-2 shadow-lg cursor-pointer rounded-md whitespace-nowrap`} >{color}</div>
                                    ))
                                    
                            }
                        </div>
                        <div className="w-20 h-32 shadow-lg relative hover:shadow-secondary transition ease-in-out delay-0 duration-400">
                        <Image  src={varientData.image.url} layout="fill" objectFit='contain' loading='eager' objectPosition="center" alt="" />
                        </div>
                        {<div className="text-gray-400 mt-8 py-2">{t("product:Size")} : <span className='text-gray-900'>{varientData.selectedOptions[1]?varientData.selectedOptions[1].value:"varient size"}</span></div>}
                        <div className='flex flex-wrap w-full py-1.5 overflow-x-auto scroll-smooth'>
                            {
                                product.options[1]&&product.options[1].name==="Size"&&product.options[1].values.map((size,index)=>(
                                    <div key={index} onClick={()=>handleChangeVarients("size",size)} className={`${variantSize===size?"bg-secondary text-white":"bg-white text-gray-900"} border m-2 border-gray-400 py-2 px-8 w-fit shadow-lg hover:shadow-primary transition ease-in-out delay-0 duration-500 cursor-pointer`}>{size}</div>
                                    ))
                                    
                            }
                        </div>
                        
                        <div className="md:flex my-4">
                        <div className="flex justify-between my-4 md:my-0">
                                <div className='flex items-center px-4 justify-center'>
                                    <button onClick={()=>handleQty("increase")} className="transition ease-in-out duration-700 hover:bg-primary hover:text-white border border-primary px-2 text-2xl rounded-full">+</button>
                                    <div className="px-4 text-xl">{qty}</div>
                                    <button  disabled={qty<1} onClick={()=>handleQty("decrease")} className="transition ease-in-out duration-700 hover:bg-primary hover:text-white border border-primary px-2.5 text-2xl rounded-full">-</button>
                                </div>
                          
                            <button className="border border-gray-400 p-4 w-fit mx-4 flex md:hidden justify-center ">
                                <MdOutlineFavoriteBorder className='text-2xl'/>
                            </button>
                            </div>
                            <button onClick={()=>handleUpdate()} className="py-2 transition ease-in-out delay-0 duration-500 hover:bg-white hover:text-primary border border-primary bg-gradient-to-tr from-primary to-secondary md:flex-grow text-white  items-center w-full flex justify-center text-xl ">
                                {t("product:add_to_card")}
                            </button>
                            <button className=" p-2 items-center w-fit mx-4 md:flex hidden justify-center ">
                            {
                                liked?(
                                <MdOutlineFavorite onClick={()=>handleDislike()} className="cursor-pointer text-4xl text-secondary"/>
                                ):(
                                <MdOutlineFavoriteBorder onClick={()=>handleLike()} className="transition ease-in-out delay-0 duration-500 hover:text-secondary cursor-pointer text-4xl text-gray-800"/>
                                )
                            }
                            </button>
                            
                        </div>
                        <div className='md:px-4'>
                            {checkoutErrMessage&&<div className='text-red-600 text-center'>{checkoutErrMessage}</div>}
                        <button disabled={checkoutLoading} onClick={handleCheckout} className="my-8 transition ease-in-out delay-0 duration-500 hover:bg-primary hover:text-white border border-primary bg-white  text-gray-900 p-2 items-center w-full flex justify-center text-xl ">
                            {checkoutLoading?<SmallLoader/>:t("product:buy_now")}
                        </button>
                       
                        </div>
                       
                        <div className="text-gray-400 my-4 py-2 text-xl font-semibold">{t("product:total")}: <span className=' mx-1 text-primary'>{varientData.priceV2.amount*qty}$</span></div>
                        <div className="text-gray-500 my-4 text-sm"> 
                            <div className="flex items-center cursor-pointer">
                                <TbTruckDelivery className='text-3xl'/>
                                <span className='text-gray-900 font-semibold mx-2'>{i18n.language==="ar"?data.freeShipping_ar:data.freeShipping_en}</span>
                            </div>
                            <Link href={"/policy/shippingPolicy"} className='text-gray-400 mx-4 mt-2 cursor-pointer'>{t("product:read_more")}</Link>
                        </div>
                        <div className="text-gray-500 my-4 py-2 text-sm"> 
                            <div className="flex items-center cursor-pointer">
                                <TbTruckReturn className='text-3xl'/>
                                <span className='text-gray-900 font-semibold mx-2'>{i18n.language==="ar"?data.freeReturn_ar:data.freerReturn_en}</span>
                            </div>
                            <Link href={`/policy/refundPolicy`} className='text-gray-400 mx-4 mt-2 cursor-pointer'>{t("product:read_more")}</Link>
                         </div>
                    </div>
                </div>
            <hr/>
            {/** comment section */}
            <div className="my-4 ">
            <div className="flex justify-center w-full my-4">
              <div className="capitalize text-3xl ">{t("product:people_reviews")}</div>
            </div>
           
                {comments.length>0?<Comments comments={comments}/>:<div className='w-full text-center'>{t("product:no_reviews")}</div>}
            </div>
            <div className=''>
                <div className='my-8'><hr/></div>
                {productRecommended.length>0&& <Slider type="related" title={t("product:Related_Product")} products={productRecommended}/>}
                {viewedCart.length>0&&<Carousel type="recentViewed" title={t("product:recent_viewed")} products={viewedCart}/>}
            </div>
            <hr/>
            <div className='flex w-full justify-center my-6'>
                <div className='w-full md:w-2/3 lg:w-1/2'>
                {commentMessage&&<div className='text-green-500 text-center text-xl'>{commentMessage}</div>}
                {commentErrorMessage&&<div className='text-red-500 text-center text-xl'>{commentErrorMessage}</div>}
                    <div className="flex items-center  justify-between px-4 md:py-4">
                     <div className="text-3xl capitalize">{t("product:your_review")}</div>
                      <div className='flex items-center'>
                        <SetStars setRate={setRate}/>
                      </div>         
                    </div>
                <form action="" onSubmit={handleComment} className='w-full'>
                    <div className="md:flex justify-between">
                        <div className='w-full md:w-1/2 px-4 py-4 md:py-0'>
                        <div className='text-sm text-gray-600'>{t("product:name")}</div>
                        <input type="text" ref={name} required minLength={3}  className="w-full outline-none border-primary border py-2 px-4"  placeholder={t("product:name")}/>
                        </div>
                        <div className='w-full md:w-1/2 px-4 py-4 md:py-0'>
                        <div className='text-sm text-gray-600'>{t("product:email")}</div>
                        <input type="email" ref={email} required minLength={3}  className="w-full outline-none border-primary border py-2 px-4"  placeholder={t("product:email")}/>
                        </div> 
                    </div>
                    
                    <div className='px-4 my-4'>
                      <div className='text-sm text-gray-600'>{t("product:message")}</div>
                      <textarea ref={message} required minLength={5} rows={8}  className="w-full outline-none border-primary border py-2 px-4"  placeholder={t("product:message")}/>
                    </div>
                    <div className="w-full text-end px-4">
                        <button disabled={commentLoading} type='submit' className='px-4 py-2 bg-primary text-white capitalize'>{commentLoading?<SmallLoader/>:t("product:send_message")}</button>
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export async function getStaticPaths ({locales}){
    const productsRes= await getProductsHandle()
    const products=JSON.parse(productsRes)
   const paths=[]
   products.edges.map(product=>{
          paths.push({params:{slug:product.node.handle},locale:locales[1]},{params:{slug:product.node.handle},locale:locales[0]})
    })

    return{
        paths,
        fallback:false
    }
}
export async function getStaticProps(ctx) {
    const URL = `${API_URL}/getComments`
    const rateURL = `${API_URL}/getRate`
     const options=(url,productId)=>{
        return{
                endpoint: url,
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id:productId })
              
        }
     }
    try{
    const {slug} =ctx.params;
    const locale=ctx.locale;
   
    
    const pages=await getPages(locale)
    const product= await getProductByHande(slug,locale)  
 
   
    // get comments and rates
    let comments="";
    let rate="";
    let recommendedProducts=[]
    if(JSON.parse(product)){
        const id=JSON.parse(product).id
        const commentRes = await fetch(URL, options(URL,id))
        comments=await commentRes.json();
        const rateRes = await fetch(rateURL, options(rateURL,id))
        rate=await rateRes.json();

        recommendedProducts=await getProductRecommended(id,locale)
    }


        const  ratedValueSplit=rate.product.metafields.edges[0]?rate.product.metafields.edges[0].node.value.split("-"):""
        return {
        props: {
           product:product?JSON.parse(product):{},
           pages:pages?JSON.parse(pages):[],
            recomendedProducts:recommendedProducts?JSON.parse(recommendedProducts):[],
           commentsData:comments?comments.product.metafields.edges:[],
           rateData:rate.product.metafields.edges[0]?{rateId:rate.product.metafields.edges[0].node.id,rateValue:ratedValueSplit[0]?ratedValueSplit[0]:0,numOfPeopleRated:ratedValueSplit[1]?ratedValueSplit[1]:0}:null,
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