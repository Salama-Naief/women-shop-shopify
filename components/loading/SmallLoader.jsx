import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";



export default function SmallLoader() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#E655B6",
    loading: true,
    CircleLoader:60,
    speedMultiplier:1,
  };
  return (
        <ClipLoader color='#E655B6' cssOverride={override}  size={35} />
  )
}