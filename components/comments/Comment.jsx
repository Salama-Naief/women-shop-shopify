import { useTranslation } from 'next-i18next';
import {useEffect, useState} from 'react'
import { MdOutlineMail, MdPersonOutline } from 'react-icons/md';
import Stars from '../rating/Stars';

export default function Comment({comment}) {
    const [commentSpit,setCommentSplit]=useState([])
    const {t,i18n}=useTranslation();
    useEffect(()=>{
       if(comment){
        setCommentSplit(comment.split("-"))
       }
    },[comment])
    
    
  return (
    <div className='p-4'>
        <div className="bg-gray-200 text-gray-900 flex flex-col justify-center px-4">
            <div className="text-start">
            <div className="my-2 w-full flex items-center"><span className='font-semibod text-gray-400 mx-2'>{t("product:rate")}</span><Stars rate={parseInt(commentSpit[2])}/></div>
            <div className="my-2 flex items-center"><MdPersonOutline className='text-2xl text-primary mx-2'/><span className=''>{commentSpit[0]}</span></div>
            <div className="my-2 flex items-center"><MdOutlineMail className='text-2xl text-primary mx-2'/><span className=''>{commentSpit[1]}</span></div>   
        </div>
        <div className="my-4">{commentSpit[3]}</div>
        </div>         
    </div> 
  )
}
