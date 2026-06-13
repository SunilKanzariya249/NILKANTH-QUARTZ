import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { categories, fetchCategories } = useProductStore();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Track scroll position for transparent navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isTransparentPage = location.pathname === '/' || location.pathname === '/products' || location.pathname === '/contact' || location.pathname === '/about' || location.pathname.startsWith('/category/');
  const isTransparent = isTransparentPage && !isScrolled;
  const headerClass = `sticky top-0 z-40 w-full text-white transition-all duration-300 ${
    isTransparent
      ? 'navbar-transparent-desktop'
      : 'bg-black/95 backdrop-blur-md shadow-lg border-b border-white/10'
  }`;

  return (
    <header className={headerClass}>
      <div className="max-w-9xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-none border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              <img 
                src="/nilkanth-quartz-logo.png" 
                alt="Nilkanth Quartz Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Luxury Industrial uppercase styling) */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative py-2 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red' : isTransparent ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-none" />
              )}
            </NavLink>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link 
                to="/products"
                className={`flex items-center gap-1.5 py-2 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] transition-colors duration-300 hover:text-brand-red ${
                  location.pathname.startsWith('/products') || location.pathname.startsWith('/category') 
                    ? 'text-brand-red' 
                    : isTransparent ? 'text-white' : 'text-gray-300'
                }`}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown Menu (Sharp industrial borders) */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-0 w-64 rounded-none shadow-2xl bg-brand-dark border border-white/10 backdrop-blur-xl overflow-hidden py-1 transition-all duration-300 transform origin-top">
                  <Link 
                    to="/products"
                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-brand-red hover:text-white transition-all"
                  >
                    <Clock className="w-3.5 h-3.5 text-brand-red group-hover:text-white" />
                    <span>All Collections</span>
                  </Link>
                  <hr className="border-white/5 my-1" />
                  
                  {categories.length === 0 ? (
                    <div className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">Loading categories...</div>
                  ) : (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        state={{ categoryName: cat }}
                        className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-300 hover:bg-brand-red hover:text-white transition-all duration-200"
                      >
                        {cat}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `relative py-2 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red' : isTransparent ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              About
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-none" />
              )}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `relative py-2 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red' : isTransparent ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              Contact
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-none" />
              )}
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/admin/login" 
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-none border border-white/20 hover:border-brand-red hover:bg-brand-red text-white transition-all duration-300 active:scale-95"
            >
              Admin Login
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-none text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 top-20 z-50 bg-brand-dark/95 backdrop-blur-lg border-t border-white/10 p-6 overflow-y-auto animate-fadeIn flex flex-col justify-between space-y-8 h-[calc(100vh-5rem)] rounded-none">
          <div className="space-y-6">
            <div className="flex flex-col space-y-5">
              <Link 
                to="/" 
                className={`text-xs font-bold uppercase tracking-[0.25em] ${location.pathname === '/' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 block">
                  Our Clock Categories
                </span>
                <div className="pl-4 border-l border-white/10 space-y-3 mt-3">
                  <Link 
                    to="/products"
                    className={`block text-xs font-bold uppercase tracking-wider ${location.pathname === '/products' ? 'text-brand-red' : 'text-gray-300'}`}
                  >
                    All Collections
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      state={{ categoryName: cat }}
                      className={`block text-xs font-bold uppercase tracking-wider ${location.pathname.includes(cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')) ? 'text-brand-red' : 'text-gray-300'}`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/about" 
                className={`text-xs font-bold uppercase tracking-[0.25em] ${location.pathname === '/about' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`text-xs font-bold uppercase tracking-[0.25em] ${location.pathname === '/contact' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link 
              to="/admin/login" 
              className="block w-full py-4 text-center text-xs font-bold uppercase tracking-widest rounded-none bg-brand-red hover:bg-brand-red/90 text-white shadow-lg transition-all"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
