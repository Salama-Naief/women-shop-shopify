import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import Layout from '../components/utils/Layout'
import { getCustomer } from '../lib/shopify';
import { Store } from '../utils/Store';

 function Orders() {
    const {state,dispatch}=useContext(Store);
    const router=useRouter();
    const {token,user}=state;
    

useEffect(()=>{
  const getUser=async()=>{
    if(token){
      const customer =await getCustomer(token);
      dispatch({type:"USER_LOGIN",payload:customer})
    }
  }
  getUser();
},[token,dispatch])
useEffect(()=>{
  if(!user){
    router.push("/login?redirect=/orders")
  }  
    console.log("user",user)
  },[user,router])
  
  return (
   <Layout title={"orders page"} pages={[]}>
    <div className="container mx-auto py-8 text-center h-96">
      <h1 className='text-2xl font-bold'>Orders</h1>
      <div className="py-4 md:grid md:grid-cols-3 text-left">
          <div className="col-span-2 ">
            <div className="">orders</div>
           {user.orders.edges.length>0?(
               <div className="">orders</div>
           ):(
             <div className="">no orders</div>
           )}
          </div>
          <div className="col-span-1 text-left">
            <div className="capitalize my-4 font-bold">last incompoleted checkout</div>
            {user.lastIncompleteCheckout?(
              <div className="px-4">
                <div className='font-semibold'>oredrId:</div>
                  <div className="px-2"><span className='text-sm'>{user.lastIncompleteCheckout.id}</span></div>
                  <a href={user.lastIncompleteCheckout.webUrl} className="text-primary">go and complete</a>
              </div>
            ):(
            <div className="">no incompleted checkout</div>
            )}
          </div>
      </div>
    </div>
   </Layout>
  )
}
export async function getStaticProps({locale}) {
  
  try{
        return {
          props: {
            ...(await serverSideTranslations(locale, ['common',"product"]))
          }
        }
  }catch(err){
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common',"product"]))
      }
    }
 }
}
export default Orders;