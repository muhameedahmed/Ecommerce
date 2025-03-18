import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto mt-17 min-h-[90vh]">
        <Outlet></Outlet>
      </div>
     <Footer/>
    </>
  )
}
