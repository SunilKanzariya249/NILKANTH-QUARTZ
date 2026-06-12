import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

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
      className="group bg-white border border-gray-200 p-4 transition-all duration-300 flex flex-col h-full hover:shadow-md"
    >
      {/* Product Image Container */}
      <div className="w-full aspect-square bg-[#ededed] flex items-center justify-center p-6 mb-6">
        <img
          src={mainImage}
          alt={modelNo}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Info Body */}
      <div className="flex flex-col flex-grow justify-between text-center">
        <div>
          {/* Model No */}
          <h3 className="text-2xl font-bold text-gray-900 tracking-wide mb-2 uppercase">
            {modelNo}
          </h3>
          
          {/* MOQ & Price */}
          <p className="text-[11px] sm:text-xs text-gray-700 font-semibold tracking-widest uppercase mb-4">
            MOQ : {moq || 100}pcs <span className="text-gray-300 mx-1">||</span> Price : ₹{price}
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="border-t border-gray-200 w-full my-3" />

          {/* Inquire Button */}
          <button
            onClick={handleInquireClick}
            className="w-full flex items-center justify-center gap-2 text-gray-900 hover:text-brand-red font-bold py-1 transition-colors duration-200"
          >
            <Send className="w-4 h-4 fill-current transform rotate-[15deg]" />
            <span className="text-sm font-bold tracking-wider">Inquire</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
