import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Play, Info, Video, CheckCircle } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

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

  const { name, price, category, description, images, video } = currentProduct;
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

Product Name: ${name}
Price: ₹${price}
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
    "name": name,
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
                          alt={`${name} thumbnail ${idx + 1}`} 
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
                  className="w-full h-full object-contain"
                />
              </div>
            )}

          </div>

          {/* Right Column: Spec Info & Call to Actions */}
          <div className="md:col-span-6 space-y-6 flex flex-col justify-center">
            <span className="inline-block bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md w-fit">
              {category}
            </span>
            
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {name}
            </h1>

            <div className="border-y border-gray-100 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Wholesale Pricing (Morbi FOB)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-brand-dark">₹{price}</span>
                  <span className="text-xs text-gray-400">/ per piece</span>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4 shrink-0" />
                In Stock (Direct Factory)
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Standard spec definitions */}
            <div className="bg-brand-light rounded-2xl p-5 border border-gray-150 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700">Product Specifications</h4>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400 font-medium block">Timepiece Motor:</span>
                  <span className="font-bold text-gray-900">Premium Silent-Sweep Quartz</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Standard Shell:</span>
                  <span className="font-bold text-gray-900">ABS Plastic / Glass Screen</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Average Dimension:</span>
                  <span className="font-bold text-gray-900">300mm x 300mm (Standard)</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Country of Origin:</span>
                  <span className="font-bold text-gray-900">Morbi, Gujarat, India</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold uppercase tracking-wider text-xs py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/10 transition-transform active:scale-95 duration-200"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
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
