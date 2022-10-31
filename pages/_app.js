import '../styles/globals.css'
import { appWithTranslation, useTranslation } from 'next-i18next';
import StoreProvider from '../utils/Store'
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import NextNProgress from "nextjs-progressbar";




function MyApp({ Component, pageProps }) {

  const {i18n}=useTranslation();
  const [loading,setLoading]=useState(true)
  const [weglotLoaded,setWeglotoaded]=useState(false)

/*useEffect(()=>{
  if(!window.Weglot){
    const script=document.createElement("script");
    script.type="text/javascript";
    script.src="https://cdn.weglot.com/weglot.min.js";
    document.head.appendChild(script)
  }
    setWeglotoaded(true);
},[])
*/

useEffect(()=>{
   /*if(window.Weglot&&!window.Weglot.nitialized){
    window.Weglot.initialize({
       api_key:'wg_df2e98f9cef03f521b0541d1b65028704'
    });
  }*/
},[])

  useEffect(()=>{
    setLoading(false)
  },[loading])
  //loading
  if(loading){
    
    return(
        <Loading/>
    )
  }
  return(

        <StoreProvider>
          <div className={`font-serif `} style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
            <NextNProgress color="#ff8700"/>
            <Component {...pageProps} />
          </div>
        </StoreProvider>
  
    )
}



export default appWithTranslation(MyApp)
