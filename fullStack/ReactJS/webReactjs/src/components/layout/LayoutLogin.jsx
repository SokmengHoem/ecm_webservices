import React from 'react'
import { Outlet } from 'react-router-dom';

const LayoutLogin = () => {
  return (
    <div>
        <div className=' bg-gray-600 '>
            <h1 className=' text-white text-center font-bold text-2xl py-3'>Brand Name</h1>
        </div>
        <div className=' p-3'>
            <Outlet/>
        </div>
    </div>
  )
}

export default LayoutLogin;