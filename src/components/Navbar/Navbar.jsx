    import React, { useContext } from 'react'
    import { useLocation, NavLink, useNavigate } from 'react-router-dom'
    import { Usercontext } from '../../Context/Usercontext'
    import logo from"../../assets/2085.jpg"
    import {  } from "react-router-dom";
import { cartcontext } from '../../Context/Cartcontext';
    export default function Navbar() {
    let{usertoken ,Setusertoken}= useContext(Usercontext);
    let navigate =useNavigate();
     let {cart}=useContext(cartcontext);
    function Logout(){
        Setusertoken(null);
        localStorage.removeItem('usertoken');
        localStorage.removeItem('User_ID');
        localStorage.removeItem('email');   
        navigate('/Login');
    }
    const location = useLocation();
    return (
        <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 fixed left-0 top-0 right-0 z-50">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <NavLink href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10 rounded-4xl border-5 border-red-700" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">R D E R</span>
        </NavLink>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {usertoken===null?<>
                <li>
                    {console.log.apply(location.pathname)}
                <NavLink to={'/Login'} className={location.pathname==='/Login'?"text-blue-700":"block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0"}>Login</NavLink>
          
            </li>
            <li>
              <NavLink to={'Register'} className={location.pathname==='/Register'?"text-blue-700":"block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0"}>Register</NavLink>
            </li></> :null}
            {usertoken!==null?<>       
            <li>
            <NavLink to={""} className={location.pathname==="/"?"text-blue-700":"block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0"}>Home</NavLink>
            </li>
            <li>
            <NavLink to={"/allorders"} className={location.pathname==='/allorders'?"text-blue-700":"block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0"}>Orders</NavLink>
            </li>
            <li>
            <NavLink to={"/Cart"} className={location.pathname==='/Cart'?"text-blue-700":"block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0"}>Cart <i className="fa-solid fa-cart-shopping relative "><span className=' absolute left-4 bottom-1.5 text-xs  bg-rose-800 hover:text-white rounded-2xl p-0.5'>{cart?.numOfCartItems}</span> </i></NavLink>
            </li>
            <li>
            <span onClick={Logout} className="block py-2 px-3  rounded-sm  text-gray-100  md:hover:text-blue-500 md:p-0 focus:text-blue-700">Logout</span>
            </li>
            </>:null}
        </ul>
        </div>
    </div>
    </nav>

        
        </>
    )
    }
