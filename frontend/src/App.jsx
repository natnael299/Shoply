import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from "axios"
import Home from './components/Home'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Tracking from './components/Tracking'
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  //fetch the product from the backend
  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
  };

  //fetch the cart from the backend
  const fetchCart = async () => {
    const res = await axios.get("/api/cart-items?expand=product")
    setCart(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      await fetchCart();
    };
    loadData();
  }, []);

  //get the cart length
  function cart_length() {
    let cartLength = 0;
    if (cart) {
      if (cart) {
        cart.forEach((item) => cartLength += item.quantity); //calculate total cart leangth
      }
    };
    return cartLength
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home products={products} fetchCart={fetchCart} cart_length={cart_length} />} />
        <Route path='/checkout' element={<Checkout cart={cart} fetchCart={fetchCart} />} />
        <Route path='/orders' element={<Orders cart_length={cart_length} />} />
        <Route path='/tracking/:orderId/:productId' element={<Tracking cart_length={cart_length} products={products} />} />
      </Routes >
    </BrowserRouter >
  )
}

export default App
