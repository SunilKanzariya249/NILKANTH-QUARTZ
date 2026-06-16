import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Play, Info, Video, CheckCircle, ChevronRight } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

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

const ProductDetails = () => {
  const { slug } = useParams();
  const { currentProduct, relatedProducts, loading, error, fetchProductBySlug } = useProductStore();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('image'); // image or video
  
  // Magnifier Zoom States
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const containerRef = useRef(null);

  useEffect(() => {
    fetchProductBySlug(slug);
    setActiveImageIdx(0);
    setActiveTab('image');
  }, [slug, fetchProductBySlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24 animate-pulse space-y-12 bg-[#FCFCFC] border-t border-gray-100">
        <div className="h-6 bg-gray-200 rounded-none w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-none" />
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-none" />
              <div className="w-20 h-20 bg-gray-200 rounded-none" />
              <div className="w-20 h-20 bg-gray-200 rounded-none" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded-none w-2/3" />
            <div className="h-6 bg-gray-200 rounded-none w-1/4" />
            <div className="h-32 bg-gray-200 rounded-none w-full" />
            <div className="h-12 bg-gray-200 rounded-none w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="max-w-md mx-auto py-24 px-6 text-center space-y-6 bg-[#FCFCFC] border border-[#EEEEEE] mt-12 mb-24 rounded-none shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto rounded-none">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Product Not Found</h2>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
          {error || "The clock you are searching for might have been moved or deleted by admin."}
        </p>
        <Link
          to="/products"
          className="inline-block bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded-none transition-all duration-200 active:scale-95"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const { price, category, description, images, video, modelNo, size, pkg, moq, colors } = currentProduct;
  const currentImage = images && images.length > 0 ? images[activeImageIdx] : 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop';

  // Handle Zoom Hover Move
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Disable zoom feature on mobile size
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor percentage coordinates
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 105; // Adjust slightly for height alignment

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${currentImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%' // 2x magnification zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Generate WhatsApp Message Link
  const handleWhatsAppInquiry = () => {
    const rawMessage = `Hello,

I am interested in the following product:

Model No: ${modelNo || 'NK-N/A'}
Wholesale Price: ₹${price}
Category: ${category}
Available Colors: ${colors || 'N/A'}
MOQ: ${moq || 100} pcs
Size: ${size || 'N/A'}
Packaging: ${pkg || 'N/A'}
Product Link: ${window.location.href}

Please provide more details.`;

    const encodedText = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/919898693626?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  // Structured Data Schema for SEO
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `Model ${modelNo}`,
    "image": images,
    "description": description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-[#FCFCFC] py-2 border-t border-gray-100">
      <SEO 
        title={`Model ${modelNo} | Nilkanth Quartz Wall Clocks`} 
        description={description.substring(0, 155)} 
        image={currentImage}
        schemaData={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Navigation Breadcrumb */}
        <div className="my-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#888888] hover:text-brand-red transition-colors duration-250 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-250 group-hover:-translate-x-1" />
            Back to Catalog
          </Link>
        </div>

        {/* Product Details Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white rounded-none p-6 sm:p-10 border border-[#EEEEEE] shadow-sm mb-20">
          
          {/* Left Column: Visual Media (Gallery + Zoom) */}
          <div className="md:col-span-6 space-y-6">
            
            {/* View Tab Selector (if Video exists) */}
            {video && (
              <div className="flex gap-2 border-b border-gray-150 pb-4">
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === 'image' 
                      ? 'bg-brand-dark text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Product Photo
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === 'video' 
                      ? 'bg-brand-dark text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                  Product Video
                </button>
              </div>
            )}

            {activeTab === 'image' ? (
              <div className="flex flex-col md:flex-row-reverse gap-4 w-full">
                {/* Large Main Display Frame with Zoom */}
                <div className="flex-grow w-full">
                  <div 
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative aspect-square w-full rounded-none bg-[#FAFAFA] border border-[#EEEEEE] overflow-hidden flex items-center justify-center cursor-default md:cursor-zoom-in"
                  >
                    <img
                      src={currentImage}
                      alt={`Model ${modelNo}`}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                    
                    {/* Floating Magnified Lens Div */}
                    <div
                      style={{
                        ...zoomStyle,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backgroundRepeat: 'no-repeat'
                      }}
                      className="hidden md:block"
                    />
                  </div>
                </div>

                {/* Gallery Thumbnail Strip (Left side of main image on desktop, below on mobile) */}
                {images && images.length > 1 && (
                  <div className="flex flex-row md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-x-visible md:w-20 md:max-h-[500px]">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-white border overflow-hidden p-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                          idx === activeImageIdx 
                            ? 'border-brand-red ring-0 scale-95 shadow-sm' 
                            : 'border-[#EEEEEE] hover:border-brand-dark'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Model ${modelNo} thumbnail ${idx + 1}`} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Video Clip Player Frame */
              <div className="aspect-square w-full rounded-none bg-brand-dark border border-gray-800 overflow-hidden relative flex items-center justify-center">
                <video
                  src={video}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            )}

          </div>

          {/* Right Column: Spec Info & Call to Actions */}
          <div className="md:col-span-6 space-y-5 flex flex-col justify-center text-left max-w-full overflow-hidden">
            
            {/* Category badge - Bullet styling matching the reference image */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-black rounded-full shrink-0"></span>
              <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
                {category}
              </span>
            </div>
            
            {/* Primary Header: Model No - Large normal-to-bold font styling */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl text-black tracking-tight leading-tight font-normal">
              MODEL NO: <span className="font-bold">{modelNo}</span>
            </h1>

            {/* Product Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed tracking-normal break-words whitespace-pre-wrap max-w-full">
              {description}
            </p>

            {/* Price & MOQ Banner - Bordered row block */}
            <div className="border-t border-b border-[#E5E7EB] py-4 my-2 flex items-center justify-between text-black text-sm sm:text-base font-semibold tracking-wide">
              <span>₹{price} / Piece</span>
             
            </div>

            {/* Specifications Table - Keeping layout, updating order & typography */}
            <div className="border border-[#EEEEEE] rounded-none bg-white divide-y divide-[#EEEEEE] overflow-hidden mt-2">
              
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-black font-bold uppercase tracking-wider text-[11px] sm:text-xs">Avail. Color:</span>
                <span className="text-gray-700 font-medium uppercase tracking-normal text-xs sm:text-sm">{colors}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-black font-bold uppercase tracking-wider text-[11px] sm:text-xs">Size:</span>
                <span className="text-gray-700 font-medium tracking-normal text-xs sm:text-sm">{size}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-black font-bold uppercase tracking-wider text-[11px] sm:text-xs">Min. Order (MOQ):</span>
                <span className="text-gray-700 font-medium tracking-normal text-xs sm:text-sm">{moq || 100} Pieces</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-black font-bold uppercase tracking-wider text-[11px] sm:text-xs">Packaging (Pkg):</span>
                <span className="text-gray-700 font-medium tracking-normal text-xs sm:text-sm">{pkg}</span>
              </div>

            </div>

            {/* WhatsApp CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-widest text-[11px] py-4.5 px-8 rounded-none transition-all active:scale-[0.99] duration-200 shadow-md shadow-emerald-500/10"
              >
                <WhatsAppIcon className="w-4 h-9 fill-current" />
                Inquire via WhatsApp
              </button>
            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16 space-y-8">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-8">
              <span className="w-2.5 h-2.5 bg-black inline-block"></span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-gray-900">
                Related Clocks You May Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
