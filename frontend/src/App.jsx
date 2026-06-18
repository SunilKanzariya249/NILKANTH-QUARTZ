import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import StickyContactButtons from './components/StickyContactButtons';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CategoryProducts from './pages/CategoryProducts';
import AnchorClocks from './pages/AnchorClocks';
import AntiqueClocks from './pages/AntiqueClocks';
import CorporateClocks from './pages/CorporateClocks';
import DesignerClocks from './pages/DesignerClocks';
import OfficeClocks from './pages/OfficeClocks';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const isTransparentPage = location.pathname === '/' || location.pathname === '/products' || location.pathname === '/contact' || location.pathname === '/about' || location.pathname.startsWith('/category/');

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Do not show standard navigation on admin dashboard */}
      {!isAdminPath && <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
      
      <main className={`flex-grow ${!isTransparentPage && !isAdminPath ? 'pt-20' : ''}`}>
        {children}
      </main>

      {!isAdminPath && <Footer />}

      {/* Sticky Call, WhatsApp & Scroll-to-Top widget */}
      {!isAdminPath && !mobileMenuOpen && <StickyContactButtons />}
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
          <Route path="/category/anchor-wall-clocks" element={<AnchorClocks />} />
          <Route path="/category/antique-wall-clocks" element={<AntiqueClocks />} />
          <Route path="/category/corporate-wall-clocks" element={<CorporateClocks />} />
          <Route path="/category/designer-wall-clocks" element={<DesignerClocks />} />
          <Route path="/category/office-wall-clocks" element={<OfficeClocks />} />
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
