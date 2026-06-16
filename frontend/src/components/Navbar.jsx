import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Clock } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { categories, fetchCategories } = useProductStore();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setMobileDropdownOpen(false);
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

  const isHomePage = location.pathname === '/';
  const isTransparentPage = location.pathname === '/' || location.pathname === '/products' || location.pathname === '/contact' || location.pathname === '/about' || location.pathname.startsWith('/category/');
  const isAtTop = !isScrolled;

  const showWhiteNavbar = isMobile && isHomePage && isAtTop && !mobileMenuOpen;
  const isTransparent = isAtTop && isTransparentPage && !(isMobile && isHomePage) && !mobileMenuOpen;

  const headerClass = `sticky top-0 z-40 w-full transition-all duration-300 ${
    showWhiteNavbar
      ? 'bg-white text-black border-b border-gray-200'
      : isTransparent
      ? 'navbar-transparent-active text-white'
      : 'bg-black/95 backdrop-blur-md shadow-lg border-b border-white/10 text-white'
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
                `relative py-2 text-xs md:text-sm lg:text-base font-semibold uppercase  transition-all duration-300 hover:text-brand-red ${
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
                className={`flex items-center gap-1.5 py-2 text-xs md:text-sm lg:text-base font-semibold uppercase  transition-colors duration-300 hover:text-brand-red ${
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
                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-200 hover:bg-brand-red hover:text-white transition-all"
                  >
                    <Clock className="w-3.5 h-3.5 text-brand-red group-hover:text-white" />
                    <span>All Collections</span>
                  </Link>
                  <hr className="border-white/5 my-1" />
                  
                  {categories.length === 0 ? (
                    <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Loading categories...</div>
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
                `relative py-2 text-xs md:text-sm lg:text-base font-semibold uppercase  transition-all duration-300 hover:text-brand-red ${
                  isActive ? 'text-brand-red' : isTransparent ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              About Us
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red rounded-none" />
              )}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `relative py-2 text-xs md:text-sm lg:text-base font-semibold uppercase  transition-all duration-300 hover:text-brand-red ${
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
              className="px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest rounded-none border border-white/20 hover:border-brand-red hover:bg-brand-red text-white transition-all duration-300 active:scale-95"
            >
              Admin Login
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-none transition-all duration-300 ${
                showWhiteNavbar 
                  ? 'text-gray-800 hover:text-black hover:bg-gray-100' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 top-20 z-50 bg-brand-dark/95 backdrop-blur-lg border-t border-white/10 p-6 pb-4 overflow-y-auto animate-fadeIn flex flex-col justify-between h-[calc(100dvh-5rem)] rounded-none">
          <div className="flex flex-col items-center flex-grow pt-12 pb-8 w-full">
            <div className="flex flex-col items-center space-y-9 w-full max-w-sm">
              
              {/* Home Link */}
              <Link 
                to="/" 
                className={`text-xl sm:text-2xl   transition-colors duration-200 ${location.pathname === '/' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Home
              </Link>
              
              {/* Products Link & Submenu */}
              <div className="flex flex-col items-center w-full">
                <div className="relative flex items-center justify-center w-full">
                  <Link 
                    to="/products"
                    className={`text-xl sm:text-2xl  transition-colors duration-200 ${location.pathname === '/products' || location.pathname.startsWith('/category/') ? 'text-brand-red' : 'text-gray-300'}`}
                  >
                    Products
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileDropdownOpen(!mobileDropdownOpen);
                    }}
                    className="absolute left-[calc(50%+4rem)] p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                    aria-label="Toggle categories"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180 text-brand-red' : 'text-gray-400'}`} />
                  </button>
                </div>
                
                {mobileDropdownOpen && (
                  <div className="w-full flex flex-col items-center mt-4 space-y-3 bg-white/[0.02] border border-white/5 py-4 px-6 animate-fadeIn">
                    <Link 
                      to="/products"
                      className={`text-sm sm:text-base  tracking-wider transition-colors duration-200 ${location.pathname === '/products' ? 'text-brand-red' : 'text-gray-400'}`}
                    >
                      All Collections
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        state={{ categoryName: cat }}
                        className={`text-sm sm:text-base  tracking-wider transition-colors duration-200 ${location.pathname.includes(cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')) ? 'text-brand-red' : 'text-gray-400'}`}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About Us Link */}
              <Link 
                to="/about" 
                className={`text-xl sm:text-2xl  transition-colors duration-200 ${location.pathname === '/about' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                About Us
              </Link>

              {/* Contact Link */}
              <Link 
                to="/contact" 
                className={`text-xl sm:text-2xl  transition-colors duration-200 ${location.pathname === '/contact' ? 'text-brand-red' : 'text-gray-300'}`}
              >
                Contact
              </Link>

            </div>
          </div>

          <div className="pt-4 border-t border-white/10 w-full">
            <Link 
              to="/admin/login" 
              className="block w-full py-3.5 text-center text-xs  tracking-widest rounded-none bg-brand-red hover:bg-brand-red/90 text-white shadow-lg transition-all"
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
