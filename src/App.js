import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Error from './pages/Error';
import FAQ from './pages/FAQ';
import OrderConfirmation from './pages/OrderConfirmation';
import Products from './pages/Products';
import Sale from './pages/Sale';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import MainLayout from './layouts/MainLayout';
import MinimalLayout from './layouts/MinimalLayout';

function App() {
  const location = useLocation();

   // Pages where BottomTab should NOT appear
   const hideBottomTabRoutes = ['/admin', '/login', '/checkout', '/order-confirmation']

   const hideBottomTab = hideBottomTabRoutes.includes(location.pathname)
  return (
    <Routes>

      {/* User pages */}
       <Route element={<MainLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/products' element={<Products />} />
      <Route path='/product-details' element={<ProductDetails />} />
      <Route path='/sale' element={<Sale />} />
      </Route>

      {/* Minimal pages */}
       <Route element={<MinimalLayout />}>
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/order-confirmation' element={<OrderConfirmation />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />} />
      </Route>

      {/* 404 Page */}
      <Route path='*' element={<Error />} />
      
    </Routes>
  )
}

export default App;

