/*import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('User_ID'); 

    useEffect(() => {
        if (userId) {
            fetchUserOrders(userId);
        }
    }, [userId]);

    async function fetchUserOrders(userId) {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
            if (response.data) {
                console.log("User Orders:", response.data);
                setOrders(response.data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
            setOrders([]);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold text-gray-700 mb-4">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png" 
                        alt="No Orders" 
                        className="w-24 sm:w-48"
                    />
                    <p className="text-gray-800 text-lg sm:text-xl font-semibold mt-4">No Orders Found</p>
                    <p className="text-gray-500 text-sm sm:text-base mt-2">
                        You haven’t placed any orders yet. Start shopping now!
                    </p>
                    <Link 
                        to="/" 
                        className="mt-5 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs sm:text-sm"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="bg-white p-4 mb-4 rounded-lg shadow">
                        <div className="mb-3">
                            <p className="text-gray-700 font-semibold">
                                Total Price: <span className="text-black">${order.totalOrderPrice}</span>
                            </p>
                            <p className={`text-sm font-medium ${order.isPaid ? "text-green-600" : "text-red-500"}`}>
                                {order?.isPaid ? "Paid ✅" : "Not Paid ❌"}
                            </p>
                        </div>

                      
                        <div className="space-y-4">
                            {order?.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 border p-3 rounded-lg">
                                    <img 
                                        src={item.product.imageCover} 
                                        alt={item.product.title} 
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-900 font-semibold">{item.product.title}</p>
                                        <p className="text-gray-600 text-sm">{item.product.category.name}</p>
                                        <p className="text-gray-700 text-sm">
                                            Qty: <span className="font-bold">{item.count}</span>
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            Price: <span className="font-bold">${item.price}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}*/
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Orders() {
    const userId = localStorage.getItem("User_ID");
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [ useParams()]);

    // Fetch orders using React Query
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["userOrders", userId],
        queryFn: async () => {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
            return response.data; // Ensure correct data structure
        },
        enabled: !!userId, // Only fetch if userId exists
    });

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold text-gray-700 mb-4">Your Orders</h1>

            {/* Show Loading Spinner */}
            {isLoading && (
                <div className="flex justify-center items-center w-full h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
                </div>
            )}

            {/* Show Error Message */}
            {isError && (
                <div className="text-center text-red-500 font-medium">
                    ❌ Error fetching orders. Please try again.
                </div>
            )}

            {/* Show Empty Orders Message */}
            {!isLoading && !isError && orders?.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png"
                        alt="No Orders"
                        className="w-24 sm:w-48"
                    />
                    <p className="text-gray-800 text-lg sm:text-xl font-semibold mt-4">No Orders Found</p>
                    <p className="text-gray-500 text-sm sm:text-base mt-2">
                        You haven’t placed any orders yet. Start shopping now!
                    </p>
                    <Link
                        to="/"
                        className="mt-5 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs sm:text-sm"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}

            {/* Show Orders List */}
            {!isLoading && !isError && orders?.length > 0 && (
                orders.map((order) => (
                    <div key={order._id} className="bg-white p-4 mb-4 rounded-lg shadow">
                        <div className="mb-3">
                            <p className="text-gray-700 font-semibold">
                                Total Price: <span className="text-black">${order.totalOrderPrice}</span>
                            </p>
                            <p className={`text-sm font-medium ${order.isPaid ? "text-green-600" : "text-red-500"}`}>
                                {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
                            </p>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4">
                            {order?.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 border p-3 rounded-lg">
                                    <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-900 font-semibold">{item.product.title}</p>
                                        <p className="text-gray-600 text-sm">{item.product.category.name}</p>
                                        <p className="text-gray-700 text-sm">
                                            Qty: <span className="font-bold">{item.count}</span>
                                        </p>
                                        <p className="text-gray-700 text-sm">
                                            Price: <span className="font-bold">${item.price}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
