import React from 'react'
import ClipLoader from "react-spinners/RingLoader";



export default function Loading() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#E655B6",
    loading: true,
    CircleLoader:60,
    speedMultiplier:1,
  };
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <ClipLoader color='#E655B6' cssOverride={override}  size={50} />
    </div>
  )
}
