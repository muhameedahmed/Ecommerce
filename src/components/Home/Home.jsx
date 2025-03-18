import React from 'react'
import Recentproducts from './recentproducts'
import Categoriesslide from './categoriesslider'
import Mainslider from './Mainslider'

export default function Home() {
  return (<>
  <Mainslider/>
  <Categoriesslide/>
    <Recentproducts/>
    </>
    
    // <div className='bg-red-400 flex text-center h-28 justify-center items-center'>
    //   H O M E
    // </div>
  )
}
