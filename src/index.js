import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import ProductsReducer, { productsFetch } from './features/ProductsSlice';
import CartReducer, { getTotal } from './features/CartSlice';
import { productsAPI } from './features/ProductsAPI';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart:CartReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiidleware) => {
   return getDefaultMiidleware().concat(productsAPI.middleware)
  }
})

store.dispatch(productsFetch());
store.dispatch(getTotal());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
