import React from 'react'
import { useGetAllProductsQuery } from '../features/ProductsAPI'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addCart } from '../features/CartSlice';

function Home() {
  const {data, error, isloading} = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleAddToCart = (product) => {
    dispatch(addCart( product ))
    navigate("/cart")
  }

  return (
    <div className='home-container'>
      {isloading ? (
        <p>Loading..</p>
      ): error ? (
        <p>An error ocuureed</p>
      ) : (
        <>
        <h2>New Arrivals</h2>
        <div className="products">
          {data?.map(product => <div key={product.id} className='product'>
              <img src={product.image} alt="" />
              <div className="details">
                <span>{product.desc}</span>
                <span className='price'>${product.price}</span>
              </div>
              <button onClick={()=> handleAddToCart(product)}>Add To Cart</button>
          </div>)}
        </div>
        </>
      )}
    </div>
  )
}

export default Home