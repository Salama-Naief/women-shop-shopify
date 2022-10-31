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

function TopNavbar({page,productTypes}){  
  const {state,dispatch}=useContext(Store);
  const router=useRouter();
  const [hoverPage,setHoverPage]=useState(null);
  const [pageQuery,setPageQuery]=useState(null);
  const [typeQuery,setTypeQuery]=useState(null);
  const [cartProduct,setCartProduct]=useState([]);
  const pageContent=page.length>0?page:state.page
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
     // console.log("dsdds",pagesContent[0].attributes.popularImg.data)
     setPageQuery(router.query.p?router.query.p:null)
     const type=router.query.genre&&router.query.genre.split("-")
     
     if(type&&(type[0]==="collections"||type[0]==="category")){
      setTypeQuery(type[1])
     }else{
      setTypeQuery(null)
     }
    },[state,router.query])
  



  const handleUpdate=(qty,product)=>{
    const quantity= parseInt(qty);
    dispatch({type:"ADD_TO_CART",payload:{...product,quantity:quantity}})
  }
  
  const handleRemoceCart=(product)=>{
    dispatch({type:"REMOVE_FROM_CART",payload:{...product}})
  }

  return(
    <div className={`w-full z-20  top-0 font-serif sticky shadow-xl border-t md:block hidden `} >
      
      <div className={`px-2 z-10 flex justify-between  bg-white w-full text-gray-900 py-2.5`}>
        <div className="container flex justify-between mx-auto text-base">
          <div className="flex">
              {
              page.map(page=>(
                <div key={page.id}  onMouseOver={()=>setHoverPage(page.title)} onMouseOut={()=>setHoverPage(null)}  className="relative">

                      <div  className={`relative transition ease-in-out duration-500 hover:bg-secondary hover:text-white mx-1 md:mx-4 px-1 md:px-3 py-1 capitalize ${pageQuery===page.title?"bg-secondary text-white":"bg-white text-black"}`}>
                      <Link href={`${page.title==="Home"?"/":`/products/${page.handle}`}`}><a><span className="font-bold cursor-pointer">{page.title}</span></a></Link>
                      {page.title===hoverPage&&page.title.toLowerCase()==="blog"&&<motion.div
                           initial={{opacity:1,y:50}}
                           animate={page.title===hoverPage?{opacity:1,y:0}:{opacity:1,y:50}}
                           transition={{duration:0.2}}
                            className={`${i18n.language==="ar"?"right-0":"left-0"} whitespace-nowrap h-fit bg-white w-fit z-30`}>
                               {page.items.length>0&&<div className={`${i18n.language==="ar"?"right-0":"left-0"} whitespace-nowrap absolute top-8 h-fit bg-white w-fit z-30 border border-primary px-4`}>
                                  {
                                    page.items.map(item=>(
                                      item.type==="BLOG"&&<Link key={item.id} href={`/blog/${item.title.toLowerCase()}`}>
                                        <a className="flex items-center">
                                          <div className={`${typeQuery&&(typeQuery===item.title?"bg-secondary text-white":"bg-white text-gray-600")} bg-white text-gray-900 text-sm  px-4 my-1 w-fit py-1 transition ease-in-out duration-500 hover:bg-secondary hover:text-white`}>
                                            {item.title}
                                          </div>
                                          </a>
                                        </Link>
                                      ))  
                                  }
                                    </div>
                                 }
                            </motion.div>
                                }
                        { page.title!=="Home"&&page.title.toLowerCase()!=="blog"&&<motion.div
                            initial={{display:"none",opacity:1,y:50}}
                            animate={page.title===hoverPage?{display:"flex",opacity:1,y:0}:{display:"none",opacity:1,y:50}}
                            transition={{duration:0.2}}
                            className={`${i18n.language==="ar"?"right-0":"left-0"} whitespace-nowrap flex absolute top-8 h-fit bg-white w-fit z-30 border border-primary`}>
                              <div className="flex">
                                {
                                  productsItems.map((product,index)=>(
                                    page.title===product.type&&<div key={index} className="flex-grow capitalize h-fit text-gray-900 p-4 mx-2">
                                    <div className="text-xl  font-md">{product.type==="clothes"&&"clothes type"||product.type==="shoes"&&"shoes ventor"||product.type==="accessories"&&"accessories type"}</div>
                                    {
                                      
                                    product.items.map((item,index)=>(
                                      <Link key={index} href={`/products/${item.toLowerCase()}`}><a><div className={`${typeQuery&&(typeQuery===item?"bg-secondary text-white":"bg-white text-gray-600 ")} px-2 test-sm lowercase py-1 transition ease-in-out  duration-500 hover:bg-secondary hover:text-white`}>{item}</div></a></Link>
                                    ))

                                    }
                                  </div>
                                  ))
                                  
                                   }
                                {  
                                 page.items.length>0&&<div className="py-6">
                                   {/**الخط اللي بي الكولليكشن و النوع */}
                                      <div className="h-full w-0.5 bg-gray-300"></div>
                                    </div>
                                }
                                {page.items.length>0&&<div className="flex-grow capitalize text-gray-900 p-4 w-fit mx-2">
                                <div className="text-xl  font-md">collections</div>
                                  {
                                    page.items.map(item=>(
                                      item.type==="COLLECTION"&&<Link key={item.id} href={`/collection/${item.title.trim().replace(" ","-").toLowerCase()}`}>
                                        <a className="flex items-center">
                                          <div className={`${typeQuery&&(typeQuery===item.title?"bg-secondary text-white":"bg-white text-gray-600 ")} text-sm  px-2 w-fit py-1 transition ease-in-out duration-200 hover:bg-secondary hover:text-white`}>
                                            {item.title}
                                          </div>
                                          {item.tags.length>0&&(item.tags[0].toLowerCase()==="new"&&<ItemState type="new"/>)}
                                          {item.tags.length>0&&(item.tags[0].toLowerCase()==="sales"&&<ItemState type="sales"/>)}
                                          </a>
                                        </Link>
                                      ))  
                                  }
                                    </div>
                                 }
                          </div>
                          </motion.div>
                          }
                      </div>
                
                </div>
              ))
            }   
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