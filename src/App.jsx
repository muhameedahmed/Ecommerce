import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as router from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/register/Register'
import Login from './components/Login/Login'
import UsercontextProvider from "./Context/Usercontext"
import Protectedroute from './components/protectedroute/protectedroute'
import Errorpage from './components/Errorpage/Errorpage'
import Productdetails from './components/Home/Productdetails'
import React from 'https://esm.sh/react@18.2.0'
  import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Cartcontextprovider from './Context/Cartcontext'
import toast, { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'

function App() {
  let x=  new QueryClient();
 let Brouter= router.createBrowserRouter([
    {path:'',element:<Layout/>,children:[
        {index:true,element:<Protectedroute><Home/></Protectedroute>},
        {path:'Productdetails/:id/:category',element:<Protectedroute><Productdetails/></Protectedroute>},
        {path:'Cart',element:<Protectedroute><Cart/></Protectedroute>},
        {path:'Checkout',element:<Protectedroute><Checkout/></Protectedroute>},
        {path:'allorders',element:<Protectedroute><Orders/></Protectedroute>},
        {path:'Register',element:<Register/>},
        {path:'Login',element:<Login/>},
        {path:'*',element:<Errorpage/>}

      ]    
    }
  ])
  return (
    <>
    
    <QueryClientProvider client={x}> 
  <Cartcontextprovider>  
    <UsercontextProvider>
      <router.RouterProvider router={Brouter}></router.RouterProvider>
      <Toaster />
      <ReactQueryDevtools />
    </UsercontextProvider>
  </Cartcontextprovider>
</QueryClientProvider>
   
    
    </>
  )
}

export default App
