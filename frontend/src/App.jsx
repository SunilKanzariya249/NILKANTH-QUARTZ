import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CategoryProducts from './pages/CategoryProducts';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Global Scroll to Top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Layout Wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Do not show standard navigation on admin dashboard */}
      {!isAdminPath && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>

      {!isAdminPath && <Footer />}

      {/* Floating WhatsApp Quick Link */}
      {!isAdminPath && (
        <a
          href="https://wa.me/919426842751?text=Hello%20Nilkanth%20Quartz,%20I%20would%20like%20to%20inquire%20about%20your%20wall%20clocks."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.376 0 9.75-4.373 9.75-9.75 0-2.584-1.005-5.013-2.83-6.839C16.313 2.186 13.89 1.18 11.3 1.18 5.925 1.18 1.55 5.553 1.55 10.93c-.001 1.516.402 3.003 1.168 4.29l-.178.65-.632 2.308 2.365-.62.673-.176zm10.976-5.856c-.234-.117-1.383-.683-1.597-.762-.214-.078-.37-.117-.526.117-.156.234-.604.762-.74 1.132-.136.37-.272.41-.506.292-.234-.117-.988-.364-1.882-1.162-.693-.618-1.162-1.384-1.298-1.618-.136-.234-.015-.361.103-.478.106-.105.234-.273.35-.41.117-.136.156-.234.234-.39.078-.156.039-.292-.02-.41-.059-.117-.526-1.268-.72-1.737-.19-.459-.398-.396-.547-.404l-.467-.008c-.156 0-.41.059-.624.292-.214.234-.819.801-.819 1.95 0 1.15.838 2.263.955 2.419.117.156 1.65 2.52 3.998 3.53.559.24 1.0.382 1.341.49.561.179 1.072.154 1.475.093.45-.069 1.383-.566 1.578-1.113.195-.547.195-1.015.137-1.113-.058-.097-.214-.156-.448-.273z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium">
            Chat on WhatsApp
          </span>
        </a>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Secured Dashboard Route */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Catch */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
