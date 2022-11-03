import Link from "next/link"
import {useContext, useEffect,useState } from "react"
import {motion} from 'framer-motion'
import { API_URL } from "../../utils/url"
import { Store } from "../../utils/Store"
import { MdOutlineShoppingBasket,MdOutlineClear } from "react-icons/md"
import {BsHeart} from "react-icons/bs";
import {HiOutlineShoppingCart} from "react-icons/hi";
import Image from "next/image"
import dynamic from 'next/dynamic';
import { useTranslation } from "next-i18next"
import MenuCart from "../menuCart/MenuCart"
import { useRouter } from "next/router"
import ItemState from "./ItemState"
import MenuHeart from "../menuCart/MenuHeart"

function TopNavbar({pages,productTypes}){  
  const {state,dispatch}=useContext(Store);
  const router=useRouter();
  const [hoverPage,setHoverPage]=useState(null);
  const [pageQuery,setPageQuery]=useState(null);
  const [typeQuery,setTypeQuery]=useState(null);
  const [cartProduct,setCartProduct]=useState([]);
  const [menuCart,setMenuCart]=useState(false);
  const [menuHeart,setMenuHeart]=useState(false);
  const {t,i18n}=useTranslation();
  const [productsItems,setProductsItems]=useState([])

  
 useEffect(()=>{
  let clothesArray=[];
  let accessoryArray=[];
  let shoesArray=[];
  productTypes&&productTypes.clothes&&productTypes.clothes.edges.map(clothes=>{
     if(!clothesArray.includes(clothes.node.productType)){
      clothesArray.push(clothes.node.productType)
     }
  })
  productTypes&&productTypes.shoes&&productTypes.shoes.edges.map(shoe=>{
    if(!shoesArray.includes(shoe.node.vendor)){
      shoesArray.push(shoe.node.vendor)
    }
 })
 productTypes&&productTypes.accessory&&productTypes.accessory.edges.map(accessory=>{
  if(!accessoryArray.includes(accessory.node.productType)){
    accessoryArray.push(accessory.node.productType)
  }
})
setProductsItems([{type:"accessories",items:accessoryArray},{type:"clothes",items:clothesArray},{type:"shoes",items:shoesArray}])

 },[productTypes])


  useEffect(()=>{
      setCartProduct(state.cart.cartItems)
     setPageQuery(router.query.p?router.query.p:null)
     const type=router.query.genre&&router.query.genre.split("-")
     
     if(type&&(type[0]==="collections"||type[0]==="category")){
      setTypeQuery(type[1])
     }else{
      setTypeQuery(null)
     }
    },[state,router.query])
  

  return(
    <div className={`w-full z-20  top-0 sticky shadow-xl border-t md:block hidden `} >
      
      <div className={`px-2 z-10 flex justify-between  bg-white w-full text-gray-900 py-2.5`}>
        <div className="container flex justify-between mx-auto text-base">
          <div className="flex ">
              {
                  pages.length>0&&pages.map((page,index)=>(
                    <div key={index}  onMouseOver={()=>setHoverPage(page.node.title)} onMouseOut={()=>setHoverPage(null)}  className="relative">
                      {
                        page.node.handle==="home"?(
                          <Link href={`/`}>
                          <a>
                            <div className="transtion duration-500 ease-in px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                          </a>
                    </Link>
                        ):
                          page.node.handle==="blog"?(    
                        <Link href={`/blog/news`}>
                            <a>
                              <div className="transtion duration-500 ease-in px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                            </a>
                         </Link>
                          ):(
                            <Link href={`/products/${page.node.handle}`}>
                            <a>
                              <div className="transtion duration-500 ease-in px-4 py-1 text-xl font-meduim capitalize hover:bg-secondary hover:text-white">{page.node.title}</div>
                            </a>
                         </Link>
                          )
                        
                        
                      }
                     
                      </div>
              ))}
          </div>
              <div className="flex">
              <div className="mx-4 flex justify-end relative text-gray-900" onClick={()=>setMenuHeart(true)} >
                  <BsHeart className="hover:text-secondary text-3xl text-gray-400 font-light cursor-pointer"/>
                  <div className="absolute bottom-1/4 right-1/3 text-primary flex justify-center items-center rounded-full">{state.lovedItems.length>0?state.lovedItems.length:"0"}</div>
              </div> 
              <div className="mx-1 flex justify-end relative text-gray-900" onClick={()=>setMenuCart(true)}>
              <HiOutlineShoppingCart className="text-3xl hover:text-secondary text-gray-600 font-light cursor-pointer"/>
                  <div className="absolute bottom-6 text-lg  -right-1 text-secondary  flex justify-center items-center rounded-full">{state.cart.cartItems&&(state.cart.cartItems.length>0?state.cart.cartItems.length:"0")}</div>
              </div>
              </div>
        </div>
        {/*menu cart*/}
        {menuCart&&<MenuCart setMenuCart={setMenuCart}/>}
        {menuHeart&&<MenuHeart setMenuHeart={setMenuHeart}/>}
      </div>
      
      
    </div>
    )
}



export default dynamic(() => Promise.resolve(TopNavbar), { ssr: false });