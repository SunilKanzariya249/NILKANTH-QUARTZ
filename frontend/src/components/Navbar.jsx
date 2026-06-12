import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { categories, fetchCategories } = useProductStore();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/nilkanth-quartz-logo.png" 
                alt="Nilkanth Quartz Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wider text-white">NILKANTH</span>
              <span className="block text-xs font-semibold tracking-widest text-brand-red uppercase">Quartz Clocks</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red font-bold' : 'text-gray-300'
                }`
              }
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
              )}
            </NavLink>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-brand-red ${
                  location.pathname.startsWith('/products') || location.pathname.startsWith('/category') 
                    ? 'text-brand-red font-bold' 
                    : 'text-gray-300'
                }`}
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-0 w-64 rounded-xl shadow-2xl bg-brand-dark/95 border border-white/10 backdrop-blur-xl overflow-hidden py-2 transition-all duration-300 transform origin-top">
                  <Link 
                    to="/products"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-brand-red/10 hover:text-brand-red transition-all"
                  >
                    <Clock className="w-4 h-4 text-brand-red" />
                    <span className="font-medium">All Collections</span>
                  </Link>
                  <hr className="border-white/5 my-1" />
                  
                  {categories.length === 0 ? (
                    <div className="px-4 py-2 text-xs text-gray-500">Loading categories...</div>
                  ) : (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        state={{ categoryName: cat }}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-brand-red/10 hover:text-brand-red hover:pl-6 transition-all duration-200"
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
                `relative py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red font-bold' : 'text-gray-300'
                }`
              }
            >
              About
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
              )}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `relative py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red font-bold' : 'text-gray-300'
                }`
              }
            >
              Contact
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-full" />
              )}
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/admin/login" 
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20 hover:border-brand-red hover:bg-brand-red text-white transition-all duration-300 active:scale-95"
            >
              Admin Login
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-50 bg-brand-dark/95 backdrop-blur-lg border-t border-white/10 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-lg font-semibold tracking-wide ${location.pathname === '/' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Home
              </Link>
              
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 block mb-2">
                  Our Clock Categories
                </span>
                <div className="pl-4 border-l border-white/10 space-y-3 mt-2">
                  <Link 
                    to="/products"
                    className={`block text-base ${location.pathname === '/products' ? 'text-brand-red' : 'text-gray-300'}`}
                  >
                    All Collections
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      state={{ categoryName: cat }}
                      className={`block text-base ${location.pathname.includes(cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')) ? 'text-brand-red' : 'text-gray-300'}`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/about" 
                className={`text-lg font-semibold tracking-wide ${location.pathname === '/about' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`text-lg font-semibold tracking-wide ${location.pathname === '/contact' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Link 
              to="/admin/login" 
              className="block w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-xl bg-brand-red hover:bg-brand-red/90 text-white shadow-lg transition-all"
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
