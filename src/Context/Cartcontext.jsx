import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Usercontext } from "./Usercontext";
import { useQuery } from "@tanstack/react-query";

export let cartcontext =createContext();
export default function Cartcontextprovider(props){
    let headers = { headers: { token: localStorage.getItem("usertoken") } };
    let [cart,Setcart]=useState(0);
    let [cartid,Setcartid]=useState(0);

    async function setcartitem(productId) {
        try {
            let response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                headers 
            );
            
            
            return response; 
        } catch (error) {
            console.error("Error adding item to cart:", error);
            return error.response; 
        }
    }
      
    async function getCartItems() {
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", headers);
            Setcart(response?.data);
            Setcartid(response?.data.cartId);
            console.log(response?.data.cartId);
            return response;
        } catch (error) {
            console.error("Error fetching cart items:", error.response?.data || error.message);
        
            
            return error;
        }
    }

    
    function updatecartitem(productid,count){return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{count},headers).then((response)=> response).catch((error)=>error)}
     function removecartitem(productid){return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,headers).then((response)=> response).catch((error)=>error)}
     function Cartcheckout(cartid,Body,url){return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`,{shippingaddress:Body},headers).then((response)=> response).catch((error)=>error)}
     async function getcart() {
        let response =await getCartItems();
        Setcart(response?.data)
     }
     useEffect(()=>{
        getcart();
     },[])

    return <cartcontext.Provider value={{cartid,cart,Setcart,setcartitem,getCartItems,removecartitem,updatecartitem,Cartcheckout}}>
       {props.children}
    </cartcontext.Provider>
}
