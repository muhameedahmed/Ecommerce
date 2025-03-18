/*import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cartcontext } from '../../Context/Cartcontext';
import toast, { Toaster } from 'react-hot-toast';
export default function Productdetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    let {id,category}=useParams();
    let[productdetails ,Setproduct]=useState();
    let[relatedproduct ,Setrelatedproduct]=useState([]);
    async function getrelatedproducts(category,id){
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((response)=>{
        let allproducts = response.data.data;
        let relatedproduct =allproducts.filter((product)=>(product.category.name == category)&&(product.id!=id))
        let sameproduct=allproducts.filter((product)=>(product.id===id))
        console.log(sameproduct[0].price);
        Setproduct(sameproduct[0]);
        Setrelatedproduct(relatedproduct);
    }).catch((error)=>{
      console.log(error.data);
    })
    }
    useEffect(()=>{
        getrelatedproducts(category,id);
    },[id,category])

    let {setcartitem} =useContext(cartcontext);
    async function addtocart(productid){
      let response= await setcartitem(productid);
      if(response?.data?.status==="success"){
        toast.success('Product added successfully to your cart')
      }else{
        console.log("error.....")
      }
  
    }
  return (<>    
<div className="product w-full max-w-3xl mx-auto p-4">
  <div className="flex flex-col sm:flex-row items-center bg-gray-200 rounded p-6">
    
   
    <div className="w-full sm:w-1/3 p-2">
      <img className="w-full rounded" src={productdetails?.imageCover} alt={productdetails?.title} />
    </div>

    {
    <div className="w-full sm:w-2/3 p-4 text-center sm:text-left">
      <span className="font-light block text-emerald-900 text-sm sm:text-lg">
        {productdetails?.category?.name}
      </span>
      <h3 className="text-base sm:text-xl font-semibold">
        {productdetails?.title}
      </h3>
      
      <div className="flex justify-around text-sm sm:text-lg mt-2">
        <span className="font-bold">{productdetails?.price} EGP</span>
        <span>
          {productdetails?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
        </span>
      </div>
      <button 
        onClick={() => addtocart(productdetails.id)}  
        className="w-full  bg-blue-700 text-white p-2 rounded mt-3 transition duration-300 hover:bg-blue-800 text-sm sm:text-lg">
        Add to cart
      </button> 
    </div>
    
  </div>
</div>

    <h1 className="text-center text-blue-500  text-xl lg:text-3xl font-bold p-10 relative uppercase tracking-wide flex items-center justify-center gap-2">
  ---<i className="fas fa-box-open  lg:text-4xl text-blue-900"></i> Related Products ---
</h1>

    <div className='related  products flex flex-row lg:mx-10 justify-center items-center flex-wrap text-center mx-auto'>
       
      {relatedproduct.map((product)=><div key={product.id} className=' w-1/3 lg:w-1/6   '>
      <div className='content m-1 bg-gray-100 rounded p-5 '>
        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
        <img className='w-full rounded' src={product.imageCover} alt={product.title} />
        <span className='font-light block text-emerald-900 text-xs lg:text-lg'> {product.category.name}</span>
        <h3 className='text-xs lg:text-lg lg:pb-3 '> {product.title.split(' ').slice(0,2).join(' ')}</h3>
        <div className="flex justify-between px-1 lg:p-2 mx-auto">
          <span className='text-xs lg:text-lg'>{product.price}EGP</span>
          <span className='text-xs lg:text-lg'>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
        </div>
        </Link>
        <button onClick={()=> addtocart(product.id)}  className=' opacity-0 translate-y-9 bg-blue-700 text-white p-1 lg:p-2 rounded transition duration-400 text-xs lg:text-lg' > Add to cart</button>
        </div>
        </div>)}
    </div>
    </>

  )
}
*/
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cartcontext } from '../../Context/Cartcontext';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function Productdetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ useParams()]);

  let { id, category } = useParams();
  let { setcartitem ,Setcart } = useContext(cartcontext);

  const { data, isLoading, error } = useQuery({
    queryKey: ['productDetails', id, category],
    queryFn: async () => {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const allProducts = response.data.data;
      
      const product = allProducts.find((product) => product.id === id);
      const relatedProducts = allProducts.filter(
        (product) => product.category.name === category && product.id !== id
      );

      return { product, relatedProducts };
    },
  });

  async function addtocart(productid) {
    let response = await setcartitem(productid);
    if (response?.data?.status === "success") {
      Setcart(response?.data);
      toast.success('Product added successfully to your cart');
    } else {
      console.log("Error adding to cart");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading product details. Please try again.</p>;
  }

  return (
    <>
      <div className="product w-full max-w-3xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center bg-gray-200 rounded p-6">
          <div className="w-full sm:w-1/3 p-2">
            <img className="w-full rounded" src={data.product?.imageCover} alt={data.product?.title} />
          </div>
          <div className="w-full sm:w-2/3 p-4 text-center sm:text-left">
            <span className="font-light block text-emerald-900 text-sm sm:text-lg">
              {data.product?.category?.name}
            </span>
            <h3 className="text-base sm:text-xl font-semibold">
              {data.product?.title}
            </h3>
            <div className="flex justify-around text-sm sm:text-lg mt-2">
              <span className="font-bold">{data.product?.price} EGP</span>
              <span>
                {data.product?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
              </span>
            </div>
            <button 
              onClick={() => addtocart(data.product.id)}  
              className="w-full bg-blue-700 text-white p-2 rounded mt-3 transition duration-300 hover:bg-blue-800 text-sm sm:text-lg">
              Add to cart
            </button> 
          </div>
        </div>
      </div>

      <h1 className="text-center text-blue-500 text-xl lg:text-3xl font-bold p-10 relative uppercase tracking-wide flex items-center justify-center gap-2">
        ---<i className="fas fa-box-open lg:text-4xl text-blue-900"></i> Related Products ---
      </h1>

      <div className='related products flex flex-row lg:mx-10 justify-center items-center flex-wrap text-center mx-auto'>
        {data.relatedProducts.map((product) => (
          <div key={product.id} className='w-1/3 lg:w-1/6'>
            <div className='content m-1 bg-gray-100 rounded p-5'>
              <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                <img className='w-full rounded' src={product.imageCover} alt={product.title} />
                <span className='font-light block text-emerald-900 text-xs lg:text-lg'> {product.category.name}</span>
                <h3 className='text-xs lg:text-lg lg:pb-3'> {product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="flex justify-between px-1 lg:p-2 mx-auto">
                  <span className='text-xs lg:text-lg'>{product.price}EGP</span>
                  <span className='text-xs lg:text-lg'>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                </div>
              </Link>
              <button onClick={() => addtocart(product.id)}  
                className='opacity-0 translate-y-9 bg-blue-700 text-white p-1 lg:p-2 rounded transition duration-400 text-xs lg:text-lg'>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
