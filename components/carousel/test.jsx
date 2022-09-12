import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";


export default function Test (props) {

    const [slideIndex,setSlideIndex]=useState(0)
    const [updateCount,setUpdateCount]=useState(0)
    const [slider,setSlider]=useState(null)
 
    useEffect(()=>{
      slider&&slider.slickGoTo(3)
    },[slider])
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () =>setUpdateCount(updateCount+1),
        beforeChange: (current, next) => setSlideIndex( next )
    };
    return (
      <div>
        <h2>Slick Go To</h2>
        <p>Total updates: {updateCount} </p>
        <input
          onChange={e => slider.slickGoTo(e.target.value)}
          value={slideIndex}
          type="range"
          min={0}
          max={3}
        />
        <Slider ref={slider => setSlider(slider)} {...settings}>
          <div>
            <img src={"http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0662%2F0371%2F3755%2Fproducts%2F09ba62adafa6de79108792f1e5467f6e.jpg%3Fv%3D1661862009&w=1920&q=75"} />
          </div>
          <div>
            <img src={"http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0662%2F0371%2F3755%2Fproducts%2F6996e186647807bebac34facded1b121.jpg%3Fv%3D1661862009&w=1920&q=75"} />
          </div>
          <div>
            <img src={"http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0662%2F0371%2F3755%2Fproducts%2Fa800346484623127603c77b6ad2d6237.jpg%3Fv%3D1661862009&w=1920&q=75"} />
          </div>
        </Slider>
      </div>
    );
  
}