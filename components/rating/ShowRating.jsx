import { useEffect } from 'react';
import { useState } from 'react'
import {BsStarFill,BsStar} from 'react-icons/bs'


function ShowRating({rating}) {
    const arr=[1,2,3,4,5]
  return (
    
    <div>
      <BsStar className='text-2xl'/>
      <BsStar className='text-2xl'/>
      <BsStar className='text-2xl'/>
    </div>
      
    
  )
}

export default ShowRating