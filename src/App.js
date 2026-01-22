import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Error from './pages/Error';
import FAQ from './pages/FAQ';
import OrderConfirmation from './pages/OrderConfirmation';
import Men from './pages/Men';
import Women from './pages/Women';
import Sale from './pages/Sale';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import MainLayout from './layouts/MainLayout';
import MinimalLayout from './layouts/MinimalLayout';
import { CartProvider } from './context/CartContext';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();

  // Pages where BottomTab should NOT appear
  const hideBottomTabRoutes = ['/admin', '/login', '/add-product', '/manage-products', '/checkout', '/order-confirmation']

  const hideBottomTab = hideBottomTabRoutes.includes(location.pathname)
  
  return (
    <AuthProvider>
      <CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
        <Routes>

          {/* User pages */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/men' element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/sale' element={<Sale />} />
          </Route>

          {/* Minimal pages */}
          <Route element={<MinimalLayout />}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />
            <Route path='/login' element={<Login />} />

            {/* Protected admin pages */}
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path='/add-product' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path='/manage-products' element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
          </Route>

          {/* 404 Page */}
          <Route path='*' element={<Error />} />
        </Routes>
      </CartProvider>
      </AuthProvider>
  )
}

export default App;

