import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';
import {data} from "../../utils/PoliciyData";
function Policies() {
    //const [data,setData]=useState([1]);
    const {i18n}=useTranslation()
    useEffect(()=>{
      
    },[])
  return (
    <div className='flex flex-wrap container mx-auto mb-4'>
        {
            data.length>0&&data.map((item,index)=>(
                <div key={index} className='flex w-fulll p-4 md:w-1/2 lg:1/3 my-4 items-center '>
                  
                  <div className='relative w-14 h-14 rounded-full'>
                    <Image src={item.imgUrl} layout='fill' alt={item.imgUrl}/>
                  </div>
                  <div className="px-4">
                    <Link href={item.policy_url}><a className="font-semibold text-sm">{i18n.language==="ar"?item.title_ar:item.title_en}</a></Link>
                    <div className="text-gray-400 text-sm">{i18n.language==="ar"?item.desc_ar:item.desc_en}</div>
                  </div>

                </div>
            ))
        }
    </div>
  )
}

export default Policies
