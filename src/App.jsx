import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/placeorder/Placeorder';
import Footer from './components/footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/verify/Verify';
import Myorder from './pages/myorder/Myorder';

export default function App() {

  const [showlogin, setShowlogin] = useState(false);


  return (
    <>
    {showlogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
      <div className='app'>
        <Navbar setshowlogin={setShowlogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<Myorder/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}
