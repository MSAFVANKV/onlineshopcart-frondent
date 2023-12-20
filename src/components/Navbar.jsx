import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
  const {cartTotalQty} = useSelector(state => state.cart)
  return (
    <div className='nav-bar'>
       <Link to="/">
       <h2>OnlineShop - Cart</h2>
       </Link>
       {/* ==== */}
        <Link  to="/cart">
        <div className="nav-bag">
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="35" 
            height="35" 
            fill="currentColor" 
            className="bi bi-bag-fill" 
            viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
        </svg>
        <span className='bag-quantity'>
            <span className="">{cartTotalQty}</span>
        </span>
        </div>
        </Link>
    </div>
  )
}

export default Navbar