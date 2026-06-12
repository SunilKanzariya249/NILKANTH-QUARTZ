import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

const Footer = () => {
  const { categories } = useProductStore();

  return (
    <footer className="bg-brand-dark text-white border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-lg">
                <img 
                  src="/nilkanth-quartz-logo.png" 
                  alt="Nilkanth Quartz logo" 
                  className="h-8 w-auto"
                />
              </div>
              <span className="text-lg font-bold tracking-wider">NILKANTH QUARTZ</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pioneers in high-quality quartz wall clocks. Combining premium craftsmanship, sleek modern styling, and accurate technology to decorate your walls.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-white/10 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-white/10 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Full Catalog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-6">Clock Collections</h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    state={{ categoryName: cat }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="text-sm text-gray-500 italic">No categories loaded</li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span>
                  Lati Road, Near Railway Crossing, Morbi - 363641, Gujarat, India.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <a href="tel:+919909912186" className="hover:text-white transition-colors">
                  +91 99099 12186
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-red shrink-0" />
                <a href="mailto:info@nilkanthquartz.com" className="hover:text-white transition-colors">
                  info@nilkanthquartz.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright divider */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Nilkanth Quartz. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-brand-red flex items-center gap-1 transition-colors">
              Admin Area <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
