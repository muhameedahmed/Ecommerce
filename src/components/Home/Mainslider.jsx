import React from 'react'
import mainslider from "../../assets/10.avif"
import mainslider1 from "../../assets/11.avif"
import mainslider5 from "../../assets/5.avif"

import mainslider12 from "../../assets/6.avif"
import mainslider13 from "../../assets/7.avif"
import mainslider14 from "../../assets/8.avif"
import mainslider15 from "../../assets/9.avif"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
export default function Mainslider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 3,
        autoplay:true,
      };
  return (
    <>
      <div className="flex flex-row mx-5" >
      
        <div className="w-4/5 h-[100%] lg:py-10">
        
        <Slider {...settings}>
            
        <img src={mainslider12} alt="" className=' w-full  h-[100%]'/>
        <img src={mainslider13} alt="" className=' w-full  h-[100%]'/>
        <img src={mainslider14} alt="" className=' w-full  h-[100%]'/>
        <img src={mainslider15} alt="" className=' w-full  h-[100%]'/>
        </Slider></div> 
        <div className="w-1/5 lg:py-5">
        <img src={mainslider} alt="" className='w-full '/>
        <img src={mainslider1} alt="" className='w-full '/>
        </div>
    
      </div>
    </>
  )
}
