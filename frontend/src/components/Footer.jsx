import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

const Footer = () => {
  const { categories } = useProductStore();

  return (
    <footer className="bg-brand-dark text-white border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-none border border-white/10 shadow-sm inline-block">
                <img 
                  src="/nilkanth-quartz-logo.png" 
                  alt="Nilkanth Quartz logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-wider">
              Pioneers in high-quality quartz wall clocks. Combining premium craftsmanship, sleek modern styling, and accurate technology to decorate your walls.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-red hover:bg-brand-red transition-all duration-300"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-red hover:bg-brand-red transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red inline-block"></span>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Quick Links</h4>
            </div>
            <ul className="space-y-3.5">
              <li>
                <Link to="/" className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250">
                  Full Catalog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="/Nilkanth Quartz .pdf" 
                  download="Nilkanth_Quartz_Catalogue.pdf" 
                  className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250 flex items-center gap-1.5"
                >
                  Download Catalogue
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red inline-block"></span>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Collections</h4>
            </div>
            <ul className="space-y-3.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    state={{ categoryName: cat }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA] hover:text-brand-red transition-colors duration-250"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="text-xs text-gray-500 font-bold uppercase tracking-wider italic">No categories loaded</li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red inline-block"></span>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Contact Info</h4>
            </div>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-wider text-gray-400">
              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>
                  Lati Road, Near Railway Crossing, Morbi - 363641, Gujarat, India.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a href="tel:+919426842751" className="hover:text-brand-red transition-colors duration-250">
                  +91 94268 42751
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a href="mailto:info@nilkanthquartz.com" className="hover:text-brand-red transition-colors duration-250 normal-case">
                  info@nilkanthquartz.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright divider */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Nilkanth Quartz. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-brand-red flex items-center gap-1 transition-colors duration-250">
              Admin Area <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
