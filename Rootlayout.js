import React from 'react'
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';


function RootLayout() {
  return (
    <div>
      <Navbar />
      {/*<userLoginStore>*/}
      <Outlet/>
      {/*</userLoginStore>*/}
      
    </div>
  )
}

export default RootLayout;