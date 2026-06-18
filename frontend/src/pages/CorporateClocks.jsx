import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const getCategorySlug = (catName) => {
  let name = catName.toLowerCase().trim();
  name = name.replace(/(?:wall\s*)?clocks?$/, '').trim();
  return `${name}-wall-clocks`.replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');
};

const isCorporate = (catName) => {
  const name = catName.toLowerCase();
  return name.includes('corporate') || name.includes('promotional');
};

const CorporateClocks = () => {
  const { 
    products, 
    categories, 
    loading, 
    fetchProducts, 
    fetchCategories 
  } = useProductStore();
  
  const navigate = useNavigate();

  // Dynamically resolve the category name from database categories matching 'corporate' or 'promotional'
  const dbCategoryName = categories.find(isCorporate) || 'Corporate Wall Clock';

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts({ category: dbCategoryName, page: 1, limit: 100 });
  }, [dbCategoryName, fetchProducts]);

  const handleCategorySelect = (cat) => {
    if (isCorporate(cat)) return;
    navigate(`/category/${getCategorySlug(cat)}`);
  };

  // Helper to format category name to match screenshot style
  const getDisplayCategoryName = (cat) => {
    let name = cat.trim();
    name = name.replace(/(?:wall\s*)?clocks?$/i, '').trim();
    return `${name} Wall Clocks`;
  };

  return (
    <div className="bg-[#FCFCFC] py-0 min-h-screen select-none overflow-hidden">
      <SEO 
        title="Corporate & Promotional Wall Clocks | Nilkanth Quartz" 
        description="Premium corporate wall clocks collection. Perfect executive designs and custom business timepieces with silent sweep movement for offices and corporate gifting."
      />

      {/* Page Header Banner */}
      <div className="bg-brand-dark text-white pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-white/10 mb-12 min-h-[340px] sm:min-h-[300px] lg:min-h-[260px] flex flex-col justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                COLLECTION
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight uppercase">
              CORPORATE WALL CLOCKS
            </h1>
            <p className="text-gray-300 text-xs font-medium uppercase tracking-wider max-w-xl">
              Professional timepieces engineered for corporate workspaces, executive suites, and premium business gifting.
            </p>
          </motion.div>
          <div className="relative max-w-md w-full hidden lg:block h-12"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar Filters - Categories */}
          <aside className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sticky top-28"
            >
              {/* Header block */}
              <div className="bg-black text-white px-5 py-2 text-sm font-bold uppercase tracking-wider inline-block">
                Categories
              </div>

              {/* Category links */}
              <div className="flex flex-col space-y-3 pl-1 pt-2">
                <Link
                  to="/products"
                  className="w-full text-left text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors duration-200"
                >
                  - All Wall Clocks
                </Link>

                {categories.map((cat) => {
                  const isSelected = isCorporate(cat);
                  const displayName = getDisplayCategoryName(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isSelected 
                          ? 'text-brand-red font-semibold cursor-default' 
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      - {displayName}
                    </button>
                  );
                })}
                {categories.length === 0 && (
                  <span className="text-xs text-gray-400 italic">Loading categories...</span>
                )}
              </div>
            </motion.div>
          </aside>

          {/* Right Product List & Description */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* Description paragraphs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-[#555555] text-sm sm:text-base leading-relaxed tracking-wide font-medium"
            >
              <p>
                Corporate wall clocks are professional, elegant, and sophisticated timepieces designed to elevate office environments, meeting rooms, boardrooms, and commercial spaces. Featuring clean dials, minimalist markings, and sleek professional finishes, these clocks add a sense of structure and punctuality to any workspace. With their silent sweep quartz movement and durable design, they offer quiet precision without disturbing the work focus.
              </p>
              <p>
                Whether for corporate branding, executive suites, reception areas, or business gifting, corporate clocks make a lasting impression of quality and reliability. Available in modern metal frames, classic wood borders, and custom design layouts, they represent a perfect synthesis of practical function and office aesthetics. Designed to match modern business interiors, these clocks bring professional charm, timeless style, and accuracy to corporate environments.
              </p>
            </motion.div>

            {/* Divider line */}
            <hr className="border-[#E5E5E5] my-6" />

            {/* Red block title in the center */}
            <div className="flex justify-center my-6">
              <span className="bg-brand-red text-white px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-center shadow-md shadow-brand-red/10">
                Corporate Wall Clocks Collection
              </span>
            </div>

            {/* Product Grid */}
            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </motion.div>

                {products.length === 0 && (
                  <div className="bg-white border border-[#EEEEEE] rounded-none p-16 text-center space-y-6 shadow-sm">
                    <Inbox className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">No Corporate Clocks Found</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider max-w-xs mx-auto leading-relaxed">
                      We currently do not have any clocks added under the Corporate/Promotional category. Please check back later.
                    </p>
                    <Link
                      to="/products"
                      className="inline-block bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-none transition-colors"
                    >
                      Browse Other Clocks
                    </Link>
                  </div>
                )}
              </>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

export default CorporateClocks;
