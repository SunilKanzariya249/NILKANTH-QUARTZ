import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { modelNo, slug, price, category, images, moq } = product;

  const mainImage = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop';

  const handleInquireClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productUrl = `${window.location.origin}/product/${slug}`;
    const rawMessage = `Hello,

I am interested in inquiring about the following clock model:

Model No: ${modelNo || 'N/A'}
Wholesale Price: ₹${price}
MOQ: ${moq || 100} pcs
Product Link: ${productUrl}

Please provide more details.`;

    const encodedText = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/919426842751?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link 
      to={`/product/${slug}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        <img
          src={mainImage}
          alt={modelNo}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg"
          loading="lazy"
        />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-gray-150 shadow-sm">
          <Tag className="w-3.5 h-3.5 text-brand-red" />
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-3">
          <h3 className="font-extrabold text-gray-900 group-hover:text-brand-red text-base line-clamp-1 transition-colors duration-300">
            Model: {modelNo}
          </h3>
          
          {/* MOQ Field */}
          <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="font-semibold text-gray-400">Min. Order (MOQ)</span>
            <span className="font-bold text-brand-dark bg-white px-2 py-0.5 rounded-md border border-gray-150 shadow-sm">
              {moq || 100} pcs
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Wholesale Price</span>
            <span className="text-xl font-extrabold text-brand-dark">₹{price}</span>
          </div>

          <button
            onClick={handleInquireClick}
            className="flex items-center gap-1 bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-brand-red/10 active:scale-95"
          >
            Inquire
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
