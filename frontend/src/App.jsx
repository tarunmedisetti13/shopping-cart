import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { getAllProducts } from './api/products.js';
import ProductDetail from './pages/ProductDetail'
import ScrollToTop from './components/ScrollToTop.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Cart from './pages/Cart.jsx';
const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let ignore = false

    getAllProducts()
      .then((products) => {
        if (!ignore) {
          setProducts(products)
          console.log(products)
        }
      })
      .catch((err) => console.log(err))

    return () => {
      ignore = true // cleanup → stops second StrictMode call
    }
  }, [])
  return (
    <div>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Navigate to="/products" replace />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/products' element={<HomePage products={products} />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/user/cart' element={<Cart />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
