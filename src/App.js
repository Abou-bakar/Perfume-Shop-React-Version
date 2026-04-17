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
import { WishlistProvider } from './context/WishlistContext';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';
import ManageOrders from './pages/ManageOrders';
import ManageInventory from './pages/ManageInventory';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AnalyticsPage from './pages/AnalyticsPage';
import Wishlist from './pages/Wishlist';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

function App() {
  const location = useLocation();

  // Pages where BottomTab should NOT appear
  const hideBottomTabRoutes = ['/admin', '/login', '/add-product', '/manage-products', '/checkout', '/order-confirmation']

  const hideBottomTab = hideBottomTabRoutes.includes(location.pathname)

  return (
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>

              {/* User pages */}
              <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/men' element={<Men />} />
                <Route path='/women' element={<Women />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/sale' element={<Sale />} />
                <Route path='/wishlist' element={<Wishlist />} />
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
                <Route path='/manage-inventory' element={<ProtectedRoute><ManageInventory /></ProtectedRoute>} />
                <Route path='/manage-orders' element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
                <Route path='/analytics' element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
              </Route>

              {/* 404 Page */}
              <Route path='*' element={<Error />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
  )
}

export default App;

