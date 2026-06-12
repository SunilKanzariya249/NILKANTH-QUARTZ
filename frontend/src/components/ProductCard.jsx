import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { name, slug, price, category, images } = product;
  const mainImage = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop';

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        <img
          src={mainImage}
          alt={name}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg"
          loading="lazy"
        />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-gray-100 shadow-sm">
          <Tag className="w-3.5 h-3.5 text-brand-red" />
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 group-hover:text-brand-red text-base line-clamp-1 mb-2 transition-colors duration-300">
          {name}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
          {product.description || 'Premium wall clock crafted with meticulous quality and style.'}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Wholesale Price</span>
            <span className="text-xl font-extrabold text-brand-dark">₹{price}</span>
          </div>

          <Link
            to={`/product/${slug}`}
            className="flex items-center gap-1 bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-brand-red/10 active:scale-95"
          >
            Inquire
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
