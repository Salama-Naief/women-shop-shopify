import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {motion} from "framer-motion"
import {  MdOutlineDehaze, MdOutlinePersonOutline, 
MdOutlineSearch, MdOutlineShoppingBasket,
MdOutlineClear
} from "react-icons/md";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {BsHeart} from "react-icons/bs";
import { API_URL } from "../../utils/url";
import { Store } from "../../utils/Store";
import {useTranslation} from "next-i18next"

import { I18nContext } from "next-i18next";
import { i18n } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import MenuCart from "../menuCart/MenuCart";
import ItemState from "./ItemState";
import MenuHeart from "../menuCart/MenuHeart";
import axios from "axios";

const HeadBar=({pages})=>{
    const router =useRouter();
    const {state,dispatch} =useContext(Store);
    const pagesContent=pages.length>0?pages:state.pages
    const [cartProduct,setCartProduct]=useState([]);
    const [user,setUser]=useState(null);
    const [menuUser,setMenuUser]=useState(false);
    const [menuCart,setMenuCart]=useState(false);
    const [menuHeart,setMenuHeart]=useState(false);
    const [menuItems,setMenItems]=useState(false);
    const [pageItems,setPageItems]=useState("");
    const {t,i18n} =useTranslation();
    const [productsItems,setProductsItems]=useState([])
    const [typeQuery,setTypeQuery]=useState(null);
    const [searchProducts,setSearchProducts]=useState(null);
    const [search,setSearch]=useState("");
    

    useEffect(()=>{
    const funSearch=async()=>{
      if(search){
         if(search.length>=3){
        const url=`${API_URL}/searchProduct`
        const res = await axios.post(url, { search,locale:i18n.language })
        const products=res.data
        if(products){
          setSearchProducts(products)
        }else{
          setSearchProducts(null)
        }
      }
      }else{
        setSearchProducts(null)
      }
     
      
      }
      funSearch();
     },[search])

    useEffect(()=>{
      setCartProduct(state.cart.cartItems)
      setUser(state.user);
    },[state,cartProduct])


    const handleUpdate=(qty,product)=>{
      const quantity= parseInt(qty);
      dispatch({type:"ADD_TO_CART",payload:{...product,quantity:quantity}})
    }

    const handleRemoceCart=(product)=>{
      dispatch({type:"REMOVE_FROM_CART",payload:{...product}})
    }
    const closeMenus=()=>{

      setMenItems(false)
      setMenuCart(false)
      setMenuHeart(false)
    }
    const handleMenus=(type)=>{
      switch (type) {
       
        case 'cart':
          setMenItems(false)     
          setMenuCart(true)
          setMenuHeart(false)
          break;
          case 'heart':
          setMenItems(false)     
          setMenuCart(false)
          setMenuHeart(true)
          break;
        case 'items':
          setMenItems(true)    
          setMenuCart(false)
          setMenuHeart(false)
          break;
        
        default:
          setMenItems(false)
          setMenuCart(false)
          setMenuHeart(false)
      }
      
    }

const handleChandeLang=(e)=>{
  i18n.changeLanguage(e.target.value)
  //window.Weglot.switchTo(e.target.value)
}
   const handleLogout=()=>{
    dispatch({type:"USER_LOGOUT"})
   
   }

   const handleSearchSubmit=(e)=>{
       e.preventDefault()
       router.push(`/search/${search}`)
   }


    return(
            <div className="container sticky md:static top-0 z-30 md:z-0 w-full bg-white mx-auto flex items-center justify-between py-2 px-2 md:px-0 shadow-sm md:shadow-none "> 
                  <div className="w-1/2 md:w-1/3 text-xl md:text-3xl  text-gray-900 flex items-center " >
                    <MdOutlineDehaze className="text-2xl cursor-pointer mx-2 md:hidden" onClick={()=>handleMenus('items')}/>
                    <Link href="/">
                      <a>
                      <div className="text-2xl lg:text-4xl uppercase "><span className="text-primary ">SA</span><span className="text-secondary">NI</span></div>
                      </a>
                    </Link> 
                    </div>
                        <form onSubmit={handleSearchSubmit} className="hidden md:flex w-1/3 text-gray-900 border border-gray-400 items-center">
                          <div className="flex items-center w-full relative">
                            <input onChange={(e)=>setSearch(e.target.value)} type="text" className="flex-grow outline-none px-1 py-0 text-sm md:text-base md:px-4 md:py-1" placeholder={t("common:search")}/>
                            <MdOutlineSearch onClick={handleSearchSubmit} className="text-3xl cursor-pointer text-primary"/>
                            {searchProducts&&<div className="absolute top-8  px-4 border border-gray-400 left-0 z-40 w-full max-h-screen bg-white overflow-y-auto overfow-x-0">
                               <div className="relative">
                               {searchProducts&&searchProducts.edges.length>0&&<div className={`${i18n.language==="ar"?"left-0":"right-0"} absolute top-0 text-xl md:text-xl  border border-secondary rounded-full cursor-pointer`} onClick={()=>{setSearchProducts(null),setSearch(null)}}><MdOutlineClear/></div>}
                                {
                                   searchProducts&&searchProducts.edges.length>0?searchProducts.edges.map((p,index)=>(
                                    <div key={p.node.id} className="flex items-center my-2">
                                      <Link href={`/product/${p.node.handle}`} passHref>
                                        <a className="flex items-center">
                                          <div className="relative w-12 h-12">
                                           <Image src={p.node.images.edges[0].node.url} layout="fill" objectFit="contain" objectPosition="center" alt={p.node.images.edges[0].node.id}/>
                                          </div>
                                          <div className="mx-2">{p.node.title}</div>
                                        </a>
                                      </Link>
                                      
                                    </div>
                                  )):(
                                    search&&<div className="py-4">no products matches</div>
                                  )
                                }
                               </div>
                            </div>}
                            </div>
                            </form>
                        <div className="w-1/2 md:w-1/3 flex  items-center">
                        
                            <div className=" w-full items-center flex justify-end md:justify-between">
                            {!user?(
                            <div className="hidden md:flex w-full justify-end items-center mx-1"><Link href="/login"><a className="p-1 rounded-full border border-secondary text-gray-900"><MdOutlinePersonOutline className="text-2xl cursor-pointer"/></a></Link></div>
                            ):(
                            <div className="relative md:w-full hidden md:flex justify-end">
                            <div className="relative">
                                <div onClick={()=>setMenuUser(!menuUser)} className="border capitalize border-primary text-gray-900 text-sm py-0.5 px-1 md:text-base md:px-2 md:py-1 cursor-pointer">{user.firstName+" "+user.lastName}</div>
                                {
                                <motion.div initial={{display:"none"}} animate={menuUser?{display:"block"}:{display:"none"}}  className="absolute top-8 left-0 z-30 border border-primary bg-white py-4 px-2">
                                  <button className="py-2 text-center px-4 capitalize hover:bg-secondary hover:text-white">{user.firstName+" "+user.lastName}</button>
                                  <button className="py-2 text-center px-4 hover:bg-secondary hover:text-white">Profile</button>
                                  <button onClick={handleLogout} className="py-2 text-center px-4 hover:bg-secondary hover:text-white">Logout</button>
                                </motion.div>
                                }
                            </div>
                           
                            </div>
                            )}
                           
                            <div className="md:hidden w-1/2 mx-1 flex justify-end relative text-gray-900" onClick={()=>handleMenus("cart")}>
                                <MdOutlineShoppingBasket className="text-2xl md:text-4xl cursor-pointer"/>
                                <div className="absolute text-secondary bottom-4 md:bottom-6 right-0 px-1 md:px-2 rounded-full">{state.cart.cartItems&&(state.cart.cartItems.length>0?state.cart.cartItems.length:"0")}</div>
                            </div>
                            <div className="md:hidden flex items-center">
                              <div className="mx-1 flex justify-end relative text-gray-900" onClick={()=>handleMenus("heart")} >
                                  <BsHeart className="hover:text-secondary text-2xl text-gray-400 font-light cursor-pointer"/>
                                  <div className="absolute bottom-1 right-1/3 text-primary flex justify-center items-center rounded-full">{state.lovedItems.length>0?state.lovedItems.length:"0"}</div>
                              </div> 

                              </div>
                            </div>
                            <div className="mx-1">
                              <select name="" id="" value={i18n.language} onChange={(e)=>handleChandeLang(e)} className="px-4 py-1 outline-none appearance-none border border-primary text-gray-900 cursor-pointer">
                                <option value="en" className={`bg-white text-gray-900 appearance-none`}>English</option>
                                <option value="ar" className={`bg-white text-gray-900 appearance-none`}>العربية</option>
                              </select>
                            </div>
                        </div>

         
          {/*menu cart of product*/}
          {menuCart&&<MenuCart setMenuCart={setMenuCart}/>}
          {menuHeart&&<MenuHeart setMenuHeart={setMenuHeart}/>}
          
              {/*small size menu*/}
          {
            <motion.div initial={{x:i18n.language==="ar"?400:-400,display:"none"}} animate={menuItems?{x:0,display:"block"}:{display:"none"}} transition={{duration:0.2,type:"just"}} className={`${i18n.language==="ar"?"right-0":"left-0"} z-50 md:hidden bg-white text-gray-900 fixed bottom-0 w-5/6 md:w-1/3 md:h-5/6 border border-gray-400 px-8 h-screen overflow-y-auto overflow-x-hidden `}>
              <div className={`${i18n.language==="ar"?"left-2":"right-5"} absolute top-5  text-xl md:text-2xl p-0.5 md:p-1 border border-secondary rounded-full cursor-pointer`} onClick={()=>closeMenus()}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6 capitalize">{t("common:menu")}</div>
              <div className="flex justify-center items-center mx-1">
                {user?(
                    
                    <div className="relative py-2 text-center border capitalize border-gray-400">
                        <div onClick={()=>setMenuUser(!menuUser)} className="font-bold text-gray-900 text-sm py-0.5 px-4 cursor-pointer">{user.firstName+" "+user.lastName}</div>
                        {
                        <motion.div initial={{display:"none"}} animate={menuUser?{display:"block"}:{display:"none"}} className="text-center py-4 px-2">
                          <div className="bg-secondary h-0.5 w-full"></div>
                          <button className=" block px-4 py-2  text-center capitalize hover:bg-secondary hover:text-white">{user.firstName+" "+user.lastName}</button>
                          <button className="blockp py-2 px-4 text-center hover:bg-secondary hover:text-white">{t("common:profile")}</button>
                          <button onClick={handleLogout} className="block px-4 py-2 text-center hover:bg-secondary hover:text-white">{t("common:logout")}</button>
                        </motion.div>
                        }
                    </div>
                
                    )
                    :(
                      <div className="flex justify-center items-center mx-1">
                        <Link href={"/login"} passHref>
                        <a className="p-1 rounded-full border border-gray-400 text-gray-900">
                        <MdOutlinePersonOutline className="text-4xl cursor-pointer"/>
                        </a>
                        </Link>
                      </div>
                      
                    )
                }
              </div>
              <form onSubmit={handleSearchSubmit} className="hidden md:flex w-1/3 text-gray-900 border border-gray-400 items-center">
                          <div className="flex items-center w-full relative">
                            <input onChange={(e)=>setSearch(e.target.value)} type="text" className="flex-grow outline-none px-1 py-0 text-sm md:text-base md:px-4 md:py-1" placeholder={t("common:search")}/>
                            <MdOutlineSearch onClick={handleSearchSubmit} className="text-3xl cursor-pointer text-primary"/>
                            {searchProducts&&<div className="absolute top-8  px-4 border border-gray-400 left-0 z-40 w-full max-h-screen bg-white overflow-y-auto overfow-x-0">
                               <div className="relative">
                               {searchProducts&&searchProducts.edges.length>0&&<div className={`${i18n.language==="ar"?"left-0":"right-0"} absolute top-0 text-xl md:text-xl  border border-secondary rounded-full cursor-pointer`} onClick={()=>{setSearchProducts(null),setSearch(null)}}><MdOutlineClear/></div>}
                                {
                                   searchProducts&&searchProducts.edges.length>0?searchProducts.edges.map((p,index)=>(
                                    <div key={p.node.id} className="flex items-center my-2">
                                      <Link href={`/product/${p.node.handle}`} passHref>
                                        <a className="flex items-center">
                                          <div className="relative w-12 h-12">
                                           <Image src={p.node.images.edges[0].node.url} layout="fill" objectFit="contain" objectPosition="center" alt={p.node.images.edges[0].node.id}/>
                                          </div>
                                          <div className="mx-2">{p.node.title}</div>
                                        </a>
                                      </Link>
                                      
                                    </div>
                                  )):(
                                    search&&<div className="py-4">no products matches</div>
                                  )
                                }
                               </div>
                            </div>}
                            </div>
                            </form>
            <div className="text-base ">
            {
                  pages.length>0&&pages.map((page,index)=>(
                    <div key={index}  onMouseOver={()=>setHoverPage(page.node.title)} onMouseOut={()=>setHoverPage(null)}  className="relative">
                      {
                        page.node.handle==="home"?(
                          <Link href={`/`}>
                          <a>
                            <div className="border my-2 px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                          </a>
                    </Link>
                        ):
                          page.node.handle==="blog"?(    
                        <Link href={`/blog/news`}>
                            <a>
                              <div className="border my-2 px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                            </a>
                         </Link>
                          ):(
                            <Link href={`/products/${page.node.handle}`}>
                            <a>
                              <div className="border my-2 px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                            </a>
                         </Link>
                          )
                        
                        
                      }
                     
                      </div>
              ))}
            </div>
          </motion.div>
          } 
                            
        </div>
    )
}



export default dynamic(() => Promise.resolve(HeadBar), { ssr: false });