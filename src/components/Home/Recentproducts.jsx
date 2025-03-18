import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';

export default function Recentproducts() {
  function getRecentproducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ['getrecent'],
    queryFn: getRecentproducts
  });

  let { setcartitem, Setcart } = useContext(cartcontext);

  async function addtocart(productid) {
    let response = await setcartitem(productid);
    if (response?.data?.status === "success") {
      Setcart(response?.data);
      toast.success('Product added successfully to your cart');
    } else {
      console.log("error.....");
    }
  }

  return (
    <div className='products flex flex-row lg:mx-10 justify-center items-center flex-wrap text-center mx-auto'>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        </div>
      )}

      {/* Render Products */}
      {!isLoading && data?.data?.data.map((product) => (
        <div key={product.id} className='w-1/3 lg:w-1/6'>
          <div className='content bg-gray-100 p-3 m-1 rounded'>
            <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
              <img className='w-full rounded' src={product.imageCover} alt={product.title} />
              <span className='font-light block text-emerald-900 text-xs lg:text-lg'>
                {product.category.name}
              </span>
              <h3 className='text-xs lg:text-lg lg:pb-3'>
                {product.title.split(' ').slice(0, 2).join(' ')}
              </h3>
              <div className="flex justify-between px-1 lg:p-4 mx-auto">
                <span className='text-xs lg:text-lg'>{product.price} EGP</span>
                <span className='text-xs lg:text-lg'>
                  {product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i>
                </span>
              </div>
            </Link>
            <button 
              onClick={() => addtocart(product.id)} 
              className='opacity-0 translate-y-9 bg-blue-700 text-white p-1 lg:p-2 rounded transition duration-400 text-xs lg:text-lg'>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
