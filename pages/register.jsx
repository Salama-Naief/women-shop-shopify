import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import {useTranslation} from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/utils/Layout';
import {API_URL} from "../utils/url";
import { createCustomer, getPages } from '../lib/shopify';
import SmallLoader from '../components/loading/SmallLoader';
export default function Register({pages}) {
  const {t,i18n}= useTranslation();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [errMsg,setErrMsg]=useState('')
  const [loading,setLoading]=useState(false)
  const [useractivate,setUserActivate]=useState(false)


  const handleSubmit=async(e)=>{
      e.preventDefault();
       setLoading(true)
        const userInfo={
          firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
         }
         const url=`${API_URL}/register`
         const options={
    
                  endpoint: url,
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userInfo })
       }
             const res = await fetch(url, options)
             const token=await res.json();
        if(token.customerCreate.customer){
          setErrMsg("")
          setLoading(false)
          setUserActivate(true)
        }else if(token.customerCreate.userErrors){
          setLoading(false)
          setUserActivate(false)
          setErrMsg(token.customerCreate.userErrors[0].message)
        }
          
        setLoading(false)
  }
  if(useractivate){
    return (
      <Layout>
        <div className=" top-0 left-0 w-full h-screen flex justify-center items-center z-20">
          <div className='text-center'>
            <div>your acount need to be activate go to your email and after activation login</div>
            <div className='my-4'>
            <Link href="/login" passHref><a className='text-white px-5 py-3 bg-primary'>Login</a></Link>
            </div>
          </div>
        </div>
      </Layout>
      )
    }
  return (
    <Layout title="register page" pages={pages}>
      <div className={`container mx-auto flex justify-center my-8 px-4`} style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
          <div className=" bg-white text-gray-900 bottom-0 right-0 w-full md:w-1/2 border border-primary px-8">
                <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6 capitalize">{t('common:register_here')}</div>
                {errMsg&&<div className="text-error text-xl w-full text-center my-4 capitalize">{errMsg}</div>}
                <form className="" onSubmit={handleSubmit}>
                <input type="type" minLength={3} required onChange={(e)=>setFirstName(e.target.value)} value={firstName} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:userName")}/>
                <input type="type" minLength={3} required onChange={(e)=>setLastName(e.target.value)} value={lastName} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:userName")}/>
                <input type="email" required onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:email")}/>
                <input type="password" minLength={8} required onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:password")}/>
                <button disabled={loading} type="submit" className={`${loading?"cursor-wait":"cursor-pointer"} text-xl bg-primary py-2 w-full text-white uppercase`}>{loading?<SmallLoader/>:t("common:register")}</button>
                </form>
                <div className="text-gray-900 my-4"><span>{t("already_have_account")}?</span><Link href="/login"><a><span className="text-secondary cursor-pointer mx-1">{t("common:login")}</span></a></Link></div>
              </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({locale}) {
  try{

    const pages=await getPages(locale)
    return {
       props: {
          pages:JSON.parse(pages)||[],
          errMsg:false,
          ...(await serverSideTranslations(locale, ['common',"product"]))
        }
      }
  }catch(e){
     return {
        props: {
          errMsg:true,
          ...(await serverSideTranslations(locale, ['common',"product"]))
        }
      }
  }
  
}