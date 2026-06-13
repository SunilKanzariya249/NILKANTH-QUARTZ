import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Play, Info, Video, CheckCircle } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-pulse space-y-12">
        <div className="h-6 bg-gray-200 rounded-md w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded-md w-2/3" />
            <div className="h-6 bg-gray-200 rounded-md w-1/4" />
            <div className="h-32 bg-gray-200 rounded-md w-full" />
            <div className="h-12 bg-gray-200 rounded-xl w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-gray-500 text-sm">
          {error || "The clock you are searching for might have been moved or deleted by admin."}
        </p>
        <Link
          to="/products"
          className="inline-block bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
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
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor percentage coordinates
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

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
    const whatsappUrl = `https://wa.me/919426842751?text=${encodedText}`;
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
    <div className="bg-brand-light py-12">
      <SEO 
        title={`${name} | Nilkanth Quartz Wall Clocks`} 
        description={description.substring(0, 155)} 
        image={currentImage}
        schemaData={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-red font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Catalog
          </Link>
        </div>

        {/* Product Details Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-16">
          
          {/* Left Column: Visual Media (Gallery + Zoom) */}
          <div className="md:col-span-6 space-y-6">
            
            {/* View Tab Selector (if Video exists) */}
            {video && (
              <div className="flex gap-2 border-b border-gray-100 pb-4">
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'image' 
                      ? 'bg-brand-dark text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Product Photo
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'video' 
                      ? 'bg-brand-dark text-white' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Video className="w-4 h-4 text-brand-red animate-pulse" />
                  Product Video
                </button>
              </div>
            )}

            {activeTab === 'image' ? (
              <div className="space-y-4">
                {/* Large Main Display Frame with Zoom */}
                <div 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-8 cursor-zoom-in"
                >
                  <img
                    src={currentImage}
                    alt={name}
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
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
                  />
                </div>

                {/* Gallery Thumbnail Strip */}
                {images && images.length > 1 && (
                  <div className="flex flex-wrap gap-3">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-20 h-20 rounded-xl bg-gray-50 border overflow-hidden p-2 flex items-center justify-center transition-all ${
                          idx === activeImageIdx 
                            ? 'border-brand-red ring-2 ring-brand-red/10 scale-95' 
                            : 'border-gray-200 hover:border-brand-dark'
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
              <div className="aspect-square w-full rounded-2xl bg-brand-dark border border-gray-800 overflow-hidden relative flex items-center justify-center">
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

          </div>          {/* Right Column: Spec Info & Call to Actions */}
          <div className="md:col-span-6 space-y-6 flex flex-col justify-center">
            
            {/* Category badge */}
            <span className="inline-block bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md w-fit">
              {category}
            </span>
            
            {/* Primary Header: Model No */}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Model: {modelNo}
            </h1>

            {/* List all details one by one in a stack */}
            <div className="border border-gray-150 rounded-2xl bg-white divide-y divide-gray-150 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Model Number</span>
                <span className="font-extrabold text-brand-red bg-brand-red/5 px-2.5 py-1 rounded-lg border border-brand-red/10">{modelNo}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Wholesale Price (FOB)</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-brand-dark text-lg">₹{price}</span>
                  <span className="text-xs text-gray-400">/ piece</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Category Range</span>
                <span className="font-bold text-gray-900">{category}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Available Colors</span>
                <span className="font-bold text-gray-900 bg-brand-light px-2.5 py-1 rounded-lg border border-gray-200">{colors}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Minimum Order (MOQ)</span>
                <span className="font-bold text-brand-dark">{moq || 100} pcs</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Dimensions (Size)</span>
                <span className="font-bold text-gray-900">{size}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Packaging (Pkg)</span>
                <span className="font-bold text-gray-900">{pkg}</span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-2 text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Description</span>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>

            {/* WhatsApp CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold uppercase tracking-wider text-xs py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/10 transition-transform active:scale-95 duration-200"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                Inquire via WhatsApp
              </button>
            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16 space-y-8">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center sm:text-left">
              Related Clocks You May Like
            </h2>
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
