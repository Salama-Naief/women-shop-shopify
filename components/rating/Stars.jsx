import React from 'react'
import {BsStarFill,BsStarHalf,BsStar} from 'react-icons/bs'


export default function Stars({rate}) {

  return (
    <div className='my-4 w-fit mx-2'>
    {
        rate===0&&<div className='flex items-center'><BsStar className='text-lg md:text-xl  '/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {
        rate>0&&rate<1&&<div className='flex items-center'><BsStarHalf className='text-secondary text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {
        rate===1&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {
        rate>1&&rate<2&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarHalf className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {   
        rate===2&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {    
        rate>2&&rate<3&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarHalf className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {    
        rate===3&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {    
        rate>3&&rate<4&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarHalf className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {    
        rate===4&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStar className='mx-0.5 md:mx-1 text-lg md:text-xl'/></div>
    }
    {    
        rate>4&&rate<5&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarHalf className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/></div>
    }
    {    
        rate===5&&<div className='flex items-center'><BsStarFill className='text-secondary text-lg md:text-xl'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/><BsStarFill className='mx-0.5 md:mx-1 text-lg md:text-xl text-secondary'/></div>
    }
    </div>
  )
}
