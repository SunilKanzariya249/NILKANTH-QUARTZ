import React from 'react';
import { Link } from 'react-router-dom';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    const whatsappUrl = `https://wa.me/919898693626?text=${encodedText}`;
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
            className="w-full flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold py-1.5 transition-colors duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold tracking-wider">Inquire via WhatsApp</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
