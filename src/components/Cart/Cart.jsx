/*import React, { useContext, useEffect, useState } from 'react';
import { cartcontext } from '../../Context/Cartcontext';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
export default function Cart() {
  let [cartdetails, Setcartdetails] = useState();
  let { getCartItems, removecartitem, updatecartitem } = useContext(cartcontext);
  async function getallproducts() {
    let response = await getCartItems();
    Setcartdetails(response?.data);
  }
  let { data, isLoading } = useQuery({
    queryKey: ['getCartItems'],
    queryFn: getallproducts
  });
  async function removeproduct(prod_id) {
    await removecartitem(prod_id);
    getallproducts();
  }

  async function updateitem(prod_id, count) {
    if (count < 1) {
      removeproduct(prod_id);
    } else {
      await updatecartitem(prod_id, count);
      getallproducts();
    }
  }

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-8">
        {isLoading && (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        </div>
      )}
      {!isLoading &&cartdetails?.data?.products.length > 0 ? (
        <div className="min-h-[90vh] overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-sm sm:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 sm:p-4 text-left">Product</th>
                <th className="p-3 sm:p-4 text-center">Qty</th>
                <th className="p-3 sm:p-4 text-center">Price</th>
                <th className="p-3 sm:p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartdetails?.data?.products.map((product) => (
                <tr key={product?.product.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 flex items-center space-x-2 sm:space-x-3">
                    <img 
                      src={product?.product?.imageCover} 
                      className="w-10 h-10 sm:w-16 sm:h-16 object-contain rounded-md" 
                      alt={product?.product?.title} 
                    />
                    <span className="font-medium text-gray-800 text-xs sm:text-sm">{product?.product?.title}</span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => updateitem(product?.product.id, product?.count - 1)} 
                        className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-gray-800 text-xs sm:text-sm">{product?.count}</span>
                      <button 
                        onClick={() => updateitem(product?.product.id, product?.count + 1)} 
                        className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-gray-800 text-center text-xs sm:text-sm">{product?.price} EGP</td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => removeproduct(product?.product.id)} 
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-6">
            <Link to={'/Checkout'} className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow hover:bg-blue-700 transition text-xs sm:text-sm">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : !isLoading ? (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <img src="https://cdn-icons-png.flaticon.com/512/4555/4555975.png" alt="Empty Cart" className="w-24 sm:w-48" />
          <p className="text-lg sm:text-2xl font-semibold text-gray-800 mt-4">Your Cart is Empty</p>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Looks like you haven't added anything yet.</p>
          <Link to="/" className="mt-5 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs sm:text-sm">
            Continue Shopping
          </Link>
        </div>
      ):null}
    </div>
  );
}
*/
import React, { useContext, useEffect, useState } from "react";
import { cartcontext } from "../../Context/Cartcontext";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export default function Cart() {
  let { getCartItems, removecartitem, updatecartitem } = useContext(cartcontext);
  const queryClient = useQueryClient(); 
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [removingProductId, setRemovingProductId] = useState(null); 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ useParams()]);
  // Fetch cart items
  const { data: cartdetails, isLoading: cartItemsisLoading } = useQuery({
    queryKey: ["cartItems"], 
    queryFn: async () => {
      const response = await getCartItems();
      return response.data;
    },
  });

  // Remove mutation with spinner
  const removeMutation = useMutation({
    mutationFn: removecartitem,
    onMutate: (prod_id) => setRemovingProductId(prod_id), // Start spinner
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
      setRemovingProductId(null); // Stop spinner
    },
    onError: () => setRemovingProductId(null), // Stop spinner on error
  });

  // Update mutation with spinner
  const updateMutation = useMutation({
    mutationFn: ({ prod_id, count }) => updatecartitem(prod_id, count),
    onMutate: ({ prod_id }) => setUpdatingProductId(prod_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
      setUpdatingProductId(null);
    },
    onError: () => setUpdatingProductId(null),
  });

  return (
    <div className="container mx-auto p-4 sm:p-8">
      {cartItemsisLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        </div>
      ) : cartdetails?.data?.products.length > 0 ? (
        <div className="min-h-[90vh] overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg text-sm sm:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 sm:p-4 text-left">Product</th>
                <th className="p-3 sm:p-4 text-center">Qty</th>
                <th className="p-3 sm:p-4 text-center">Price</th>
                <th className="p-3 sm:p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartdetails?.data?.products.map((product) => (
                <tr key={product?.product.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 flex items-center space-x-2 sm:space-x-3">
                    <img
                      src={product?.product?.imageCover}
                      className="w-10 h-10 sm:w-16 sm:h-16 object-contain rounded-md"
                      alt={product?.product?.title}
                    />
                    <span className="font-medium text-gray-800 text-xs sm:text-sm">
                      {product?.product?.title}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      {updatingProductId === product?.product.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-600"></div>
                      ) : (
                        <>
                          <button
                            onClick={() => updateMutation.mutate({ prod_id: product?.product.id, count: product?.count - 1 })}
                            className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-gray-800 text-xs sm:text-sm">{product?.count}</span>
                          <button
                            onClick={() => updateMutation.mutate({ prod_id: product?.product.id, count: product?.count + 1 })}
                            className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-gray-800 text-center text-xs sm:text-sm">
                    {product?.price} EGP
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeMutation.mutate(product?.product.id)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm flex justify-center items-center"
                      disabled={removingProductId === product?.product.id} // Disable button while removing
                    >
                      {removingProductId === product?.product.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-red-600"></div>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-6">
            <Link
              to={"/Checkout"}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow hover:bg-blue-700 transition text-xs sm:text-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4555/4555975.png"
            alt="Empty Cart"
            className="w-24 sm:w-48"
          />
          <p className="text-lg sm:text-2xl font-semibold text-gray-800 mt-4">Your Cart is Empty</p>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="mt-5 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs sm:text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
