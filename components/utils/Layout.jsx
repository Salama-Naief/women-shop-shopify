import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import ConnctWithUs from './ConenctWithUs'
import HeadBar from './HeadBar'
import Policies from './Policies'
import TopNavbar from './TopNavbar'
export default function Layout({children,page,productsTypes,title,desc,pages}) {

  useEffect(()=>{
  // Weglot.initialize({
    // api_key:'wg_df2e98f9cef03f521b0541d1b65028704'
  //});
 
  },[])

   /* if(window.Weglot&&!window.Weglot.nitialized){
      window.Weglot.initialize({
         api_key:'wg_df2e98f9cef03f521b0541d1b65028704'
      });
      
    }*/
 
  console.log("windos",window.Weglot)

  return (
    <div>
        <Head>
        <title>{title?title:""}</title>
        <meta name="description" content={desc?desc:""} />
        <link rel="icon" href="/favicon.ico" />
         

      </Head>
        <main>
           <HeadBar productTypes={productsTypes?productsTypes:{}} pages={pages?pages:[]}/>
           <TopNavbar productTypes={productsTypes?productsTypes:{}} page={page?page:[]}/>
           <div>
            {children}
           </div>
           
        </main>
        <footer>     
            <ConnctWithUs/>
        </footer>
    </div>
  )
}
