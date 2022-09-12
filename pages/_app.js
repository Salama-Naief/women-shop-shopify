import '../styles/globals.css'
import { appWithTranslation, useTranslation } from 'next-i18next';
import StoreProvider from '../utils/Store'
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import NextNProgress from "nextjs-progressbar";




function MyApp({ Component, pageProps }) {

  const {i18n}=useTranslation();
  const [loading,setLoading]=useState(true)


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
