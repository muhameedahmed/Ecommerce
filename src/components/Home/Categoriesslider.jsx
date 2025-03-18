import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import axios from 'axios';
export default function Categoriesslide() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay:true,
      };
      let [categories,Setcategories]=useState([]);
      async function getrecentcategories(){
       await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
       .then((response)=>{
        Setcategories(response.data.data);
       }).catch((error)=>{
         console.log(error.data);
       })
      }
      useEffect(()=>{
        getrecentcategories();
     },[])
  return (
    <div className='my-10'>
        <h1 className='  text-xs lg:text-2xl font-light text-blue-700 mx-10 my-2 '>* Shop Popelar categories * </h1>
       <Slider {...settings}>
      {categories.map((category)=><div key={category._id} className='text-center'>
        <img className=' h-20 lg:h-50 w-full' src={category.image} alt={category.name} />
        <h3 className='text-xs lg:text-2xl'>{category.name}</h3>
      </div>)}
    </Slider>
    </div>
  )
}
