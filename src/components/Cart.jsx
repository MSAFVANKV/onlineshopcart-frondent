import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, clearCart, decreaseCart, getTotal, removeFromCart } from "../features/CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  },[cart, dispatch])

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addCart(cartItem));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is currently empty !!</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="titles">
            <h3 className="product-title">Prouduct</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
        </div>

            {/* ************************************* */}
        <div className="cart-items">
          {
            cart.cartItems?.map(cartItem => (
              <div key={cartItem.id} className="cart-item">
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />

                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>remove</button>
                  </div>
                </div>
                <div className="cart-product-price">
                  {cartItem.price}
                </div>
                <div className="cart-product-quantity">
                  <button onClick={()=> handleDecreaseCart(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={()=> handleIncreaseCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity || 0}
                </div>
              </div>
            ))
          }
        </div>
        {/* ********* */}
        <div className="cart-summary">
          <button className="clear-cart" onClick={()=>handleClearCart()}>Clear Cart</button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>SubTotal</span>
              <span className="amount">${cart.cartTotalAmount}</span>
            </div>
            <p>Taxes and Shipping Calculated at checkout</p>
            <button>Chack Out</button>
            <div className="continue-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
