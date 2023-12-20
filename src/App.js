import "react-toastify/dist/ReactToastify.css"
import React from "react";
import {BrowserRouter, Route, Routes, Navigate}from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
function App() {


  return (
   <>
   
     <BrowserRouter>
     <ToastContainer/>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
          <Route path="/cart"  element={<Cart />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
     </>
  );
}

export default App;
