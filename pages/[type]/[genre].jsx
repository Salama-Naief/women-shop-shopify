import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef, useState } from 'react';
import {MdArrowBackIosNew,MdArrowForwardIos} from "react-icons/md"
import {motion} from "framer-motion";
import Layout from '../../components/utils/Layout';
import ProductCard from "../../components/product/ProductCard";
import { API_URL } from '../../utils/url';
import Loading from '../../components/loading/Loading';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { collectionHandle, getCollectionByHande, getPages, getProducts, searchProducts } from '../../lib/shopify';

 function Products({collection,errMsg,pages,products}){
    const router=useRouter();
    const {pathname,query,asPath}=router;
    const {t,i18n}=useTranslation();
    const [productItems,setproductItems]=useState(collection);
    const [maxPrice,setMaxPrice]=useState(0);
    const [miniPrice,setMiniPrice]=useState(0);
    const [price,setPrice]=useState(0);
    const [size,setSize]=useState("");
    const [category,setCategory]=useState("");
    const [color,setColor]=useState("");
    const [allProducts,setAllProducts]=useState([])
    const [sizeArray,setSizeArray]=useState([]);
    const [categoryArray,setCategoryArray]=useState([]);
    const [colorArray,setColorArray]=useState([]);
    const [sideFilter,setSideFilter]=useState(false);
    const [loading,setLoading]=useState(true);
    const progres=useRef(); 

    useEffect(()=>{
        router.push({pathname,query},asPath,{locale:i18n.language})
       },[i18n.language])
   

    //loading
    useEffect(()=>{

        setLoading(false);
        setAllProducts(collection?collection.products.edges:products?products.edges:[])
    },[collection,products])



    const colorArr=[];
    const categoryArr=[];
    const sizeArr=[];

    useEffect(()=>{
      
      setPrice(miniPrice)
    },[miniPrice])
    //let miniPrice=0;
   // let maxPrice=0; 
useEffect(()=>{
        let miniP=0;
        let maxP=0;
     allProducts.length>0&&allProducts.forEach(item=>{  
          if(parseInt(item.node.variants.edges[0].node.priceV2.amount)>maxP){
            //maxPrice=item.attributes.price
            maxP=(parseInt(item.node.variants.edges[0].node.priceV2.amount))
        } 
        if(parseInt(item.node.variants.edges[0].node.priceV2.amount)<miniP&&miniP!==0){
            //miniPrice=item.attributes.price
            miniP=(parseInt(item.node.variants.edges[0].node.priceV2.amount))
        }else if(miniP===0){
            //miniPrice=item.node.variants.edges[0].price
            miniP=(parseInt(item.node.variants.edges[0].node.priceV2.amount))
        }
        if(!colorArr.includes(item.node.variants.edges[0].node.selectedOptions[0].value)){
            colorArr.push(item.node.variants.edges[0].node.selectedOptions[0].value)
        }
        if(item.node.variants.edges[0].node.selectedOptions.length>=2){
            if(!sizeArr.includes(item.node.variants.edges[0].node.selectedOptions[1].value)){
            sizeArr.push(item.node.variants.edges[0].node.selectedOptions[1].value)
        }
        }
        
       if(!categoryArr.includes(item.node.productType)){
            categoryArr.push(item.node.productType)
        }
    })

    setCategoryArray([...categoryArr])
    setSizeArray([...sizeArr])
    setColorArray([...colorArr])
    setMaxPrice(maxP)
    setMiniPrice(miniP)
},[allProducts])
  


const handleFilterPrice=()=>{
    const items=[]
    allProducts.forEach(item=>{
        if(parseInt(item.node.variants.edges[0].node.priceV2.amount)<price){
           items.push(item)
        }
    })
    if(items.length>0){
        setAllProducts(items)
    }
}

//handle filter category
const handleFilterCategory=()=>{
    const items=[]
    if(category==="allCategory"){
        setAllProducts(collection?collection.products.edges:products?products.edges:[])
        setColor("")
        setSize("")
        setCategory("")
    }else{
        allProducts.forEach(item=>{
                if(item.node.productType===category){
                items.push(item)
                }
        })
    }
   
    if(items.length>0){
        setAllProducts(items)
        setColor("")
        setSize("")
    }
}

///handle filter color 
const handleFilterColor=()=>{
    const items=[]
    if(color==="allColor"){
        setAllProducts(collection.products?collection.products.edges:products?products.edges:[])
        setColor("")
        setSize("")
        setCategory("")
    }else{
        allProducts.forEach(item=>{
                if(item.node.variants.edges[0].node.selectedOptions[0].value===color&&item.node.variants.edges[0].node.selectedOptions[0]){
                items.push(item)
                }
        })

    }
   
    if(items.length>0){
        setAllProducts(items)
        setSize("")
        setCategory("")
    }
}

//handle filter size
const handleFilterSize=()=>{
    const items=[]
    if(size==="allSize"){
        
        setAllProducts(collection.products?collection.products.edges:products?products.edges:[])
        setColor("")
        setSize("")
        setCategory("")
    }else{
        allProducts.forEach(item=>{
                if(item.node.variants.edges[0].node.selectedOptions[1].value===size&&item.node.variants.edges[0].node.selectedOptions[1]){
                items.push(item)
                }
        })
    }
   
    if(items.length>0){
        setAllProducts(items)
        setColor("")
        setCategory("")
    }
}
   

//check data frist
   if(errMsg){
    return(
      <Layout title={"error"} pages={pages}>
        <div className='text-3xl w-full h-screen flex justify-center items-center text-secondary'><div>No Data Found</div></div>  
    </Layout>
    )
  }

    if(loading){
    return(
        <Layout title="products pages" pages={pages}>
            <Loading/>
        </Layout>
    )
    }
    return(
        <Layout title="products pages" desc={""} pages={pages}>
            <div className='relative'>
                <div className='overflow-hidden block w-full h-72'>
                    {(collection&&collection.image)?
                    <Image src={collection.image.url} layout='responsive' objectPosition={"center"} width={32} height={16} loading="eager" alt=''/>
                    :
                    <Image src={"https://cdn.shopify.com/s/files/1/0662/0371/3755/files/product.jpg?v=1664033984"} layout='responsive' objectPosition={"center"} width={32} height={16} loading="eager" alt=''/>
                    }
                </div>
                <div className='absolute top-1/3 left-1/2 text-primary'>
                    {collection&&<h1 className='text-3xl font-bold capitalize w-full text-center my-8'>{collection.title.replace(/banner/g, "").replace(/bottomSection/g, "").replace(/topSection/g, "")}</h1>}
                    {router.query.type==="products"&&<h1 className='text-3xl font-bold capitalize w-full text-center my-8'>{router.query.genre}</h1>}
                </div>
            </div>
            
              <div className="container relative  mx-auto h-fit  my-8 ">
               <div onClick={()=>setSideFilter(true)} className={`fixed ${sideFilter?"hidden":"block"} right-0 top-1/2 z-20 md:hidden`}>
                <MdArrowBackIosNew className='text-primary text-4xl cursor-pointer'/>
                </div>
               
               <div className="flex relative">
               
                    <div className="flex flex-wrap w-full md:w-3/4 mt-4">
                        {
                           allProducts.length>0?allProducts.map(product=>(
                                <div key={product.node.id} className='w-1/2 md:w-1/3 mb-4'>
                                <ProductCard id={product.node.id} product={product.node}/>
                            </div>
                            )):(
                                <div className='w-full h-screen flex items-center justify-center'>
                                    <div className='text-xl text-secondary'>{t("product:no_product_found")}</div>
                                </div>
                            )
                    
                    }
                    </div >
                       <motion.div className={` h-screen overflow-y-scroll md:overflow-visible  border md:block bg-white fixed right-0 top-0 z-30 md:z-0 md:static md:h-fit w-3/4 md:w-1/4 p-4 my-4 ${sideFilter?"block":"hidden"}`}>
                         <div className="relative w-full">
                                <motion.div initial={{display:"none"}} animate={{display:sideFilter?"flex":"none"}} onClick={()=>setSideFilter(false)} className={`right-2/3 w-fit fixed z-30 h-screen items-center top-1/6 md:hidden`}>
                                    <MdArrowForwardIos className='text-primary text-4xl cursor-pointer'/>
                                </motion.div>
                            <div>
                            <div className="pt-4">
                            <div className='text-lg font-semibold py-4'>{t("common:price_filter")}</div>
                            <div className="w-full flex items-center">
                                <div className='p-1 border mx-1'>${price}</div>
                                <div className="w-full relative h-2 rounded-full bg-gray-100 border px-0.5">
                                    <div ref={progres} className='h-full bg-gray-300 absolute z-10 left-0 top-0'></div>
                                    <input type="range" value={price} min={miniPrice} max={maxPrice} step={1} onChange={(e)=>setPrice(e.target.value)} className='bg-transparent  w-full appearance-none absolute z-20 left-0 -top-1 border-none outline-none'/>
                                </div>
                                <div className='p-1 border mx-1'>${maxPrice}</div>
                            </div>
                            <button onClick={()=>handleFilterPrice()} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>{t("common:filter")}</button>
                            </div>
                            
                        
                            <div className="px-4">
                            <div className='text-lg font-semibold py-4'>{t("common:category_filter")}</div>
                            <label className=" block my-2">
                                <input type="radio" value="allCategory" checked={category==="allCategory"?category:""} name="all"  onChange={(e)=>setCategory(e.target.value)} /> <span className='text-lg'>{t("common:all")}</span>
                            </label>
                            {
                            categoryArray.map((categoryVal,index)=>(   
                                <label key={index} className=" block my-2">
                                    <input type="radio" value={categoryVal} checked={category===categoryVal?category:""} name={categoryVal}  onChange={(e)=>setCategory(e.target.value)} /> <span className='text-lg'>{categoryVal.toLowerCase()}</span>
                                </label>
                            ))
                        }
                        <button onClick={()=>handleFilterCategory()} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>{t("common:filter")}</button>
                        </div>
                    
                        <div className="px-4">
                        <div className='text-lg font-semibold py-4'>{t("common:size_filter")}</div>
                        <label className=" block my-2">
                            <input type="radio" value="allSize" checked={size==="allSize"?size:""} name="cash"  onChange={(e)=>setSize(e.target.value)} /> <span className='text-lg'>{t("common:all")}</span>
                        </label>
                        {
                            sizeArray.map((sizeVal,index)=>(   
                                <label key={index} className=" block my-2">
                                    <input type="radio" value={sizeVal} checked={size===sizeVal?size:""} name={sizeVal}  onChange={(e)=>setSize(e.target.value)} /> <span className='text-lg'>{sizeVal}</span>
                                </label>
                            ))
                        }
                        <button onClick={()=>handleFilterSize()} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>{t("common:filter")}</button>
                        </div>
                    
                            <div className="px-4">
                            <div className='text-lg font-semibold py-4'>{t("common:color_filter")}</div>
                            <label className=" block my-2">
                                <input type="radio" value="allColor" checked={color==="allColor"?color:""} name="allColor"  onChange={(e)=>setColor(e.target.value)} /> <span className='text-lg'>{t("common:all")}</span>
                            </label>
                            {
                                colorArray.map((colorVal,index)=>(   
                                    <label key={index} className=" block my-2">
                                        <input type="radio" value={colorVal} checked={color===colorVal?color:""} name={colorVal}  onChange={(e)=>setColor(e.target.value)} /> <span className='text-lg'>{colorVal}</span>
                                    </label>
                                ))
                            }
                        
                        <button onClick={()=>handleFilterColor()} className='my-4 transition ease-in-out delay-0 duration-500 border border-primary bg-white text-gray-900 hover:bg-primary py-1 px-8 hover:text-white'>{t("common:filter")}</button>
                        </div>

                    </div>
                </div>
                          
            </motion.div>
                   
               </div>
              
            </div>
        </Layout>
    )
}



export async function getServerSideProps(ctx) {

    const locale=ctx.locale;
    try{
        const {genre,type} =ctx.params;
        let products=[];
        let collection=null;
        if(type==="products"){
           products=await getProducts(genre,locale)
        }else if(type==="collection"){
            collection=await getCollectionByHande(genre,20,locale)
        }else if(type==="search"){
            products=await searchProducts(genre,locale)
        }
        
        const pages=await getPages(locale)
            return {
            props: {
                collection:collection?JSON.parse(collection):null,
                products:products.length>0?JSON.parse(products):[],
                pages:pages?JSON.parse(pages):[],
                errMsg:false, 
                ...(await serverSideTranslations(locale, ['common',"product"]))
            },
            }
    }catch(err){
        return {
            props: {
                errMsg:true,
                ...(await serverSideTranslations(locale, ['common',"product"]))
            },
        }
    }
    
  }

export default Products;