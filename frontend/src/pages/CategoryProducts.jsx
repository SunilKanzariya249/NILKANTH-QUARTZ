import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const getCategorySlug = (catName) => {
  let name = catName.toLowerCase().trim();
  name = name.replace(/(?:wall\s*)?clocks?$/, '').trim();
  return `${name}-wall-clocks`.replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');
};

const CategoryProducts = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    categories, 
    loading, 
    filters, 
    setFilters, 
    fetchCategories 
  } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Redirect corporate/promotional clock slug variations to the dedicated CorporateClocks page
  useEffect(() => {
    if (slug === 'corporate-clocks' || slug === 'promotional-wall-clocks') {
      navigate('/category/corporate-wall-clocks', { replace: true });
    } else if (slug === 'designer-clocks') {
      navigate('/category/designer-wall-clocks', { replace: true });
    } else if (slug === 'office-clocks') {
      navigate('/category/office-wall-clocks', { replace: true });
    } else if (slug === 'antique-clocks') {
      navigate('/category/antique-wall-clocks', { replace: true });
    }
  }, [slug, navigate]);

  // Automatically redirect old category slug style (e.g. /category/office-clocks) to the new style (/category/office-wall-clocks)
  useEffect(() => {
    if (categories.length > 0) {
      const matchedCat = categories.find(
        (cat) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
      );
      if (matchedCat) {
        const newSlug = getCategorySlug(matchedCat);
        if (newSlug !== slug) {
          navigate(`/category/${newSlug}`, { replace: true });
        }
      }
    }
  }, [slug, categories, navigate]);

  // Find category matching the URL slug
  const activeCategory = categories.find(
    (cat) => getCategorySlug(cat) === slug
  ) || '';

  useEffect(() => {
    if (activeCategory) {
      setFilters({ category: activeCategory, page: 1, limit: 100 }); // Fetch all items for this category
    }
  }, [activeCategory, slug]);

  const cleanTitle = activeCategory || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-[#FCFCFC] py-0 min-h-screen select-none">
      <SEO 
        title={`${cleanTitle} Collections | Nilkanth Quartz`}
        description={`Explore our elegant premium collections of ${cleanTitle} wall clocks. Precision crafted with silent sweep technology.`}
      />

      {/* Category Header Banner */}
      <div className="bg-brand-dark text-white pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-white/10 mb-12 min-h-[300px] flex flex-col justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                COLLECTION
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight uppercase">
              {cleanTitle} Collection
            </h1>
            <p className="text-gray-300 text-xs font-medium uppercase tracking-wider max-w-xl">
              Showing premium designs registered under our {cleanTitle} range.
            </p>
          </div>
          
          {/* Symmetric Spacer for layout balance */}
          <div className="relative max-w-md w-full hidden lg:block h-12"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-20">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#888888] hover:text-brand-red transition-colors duration-250 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-250 group-hover:-translate-x-1" />
            Back to All Products
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="bg-white rounded-none border border-gray-150 p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm text-black">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111]">No Clocks Yet</h3>
                <p className="text-[#666666] text-xs uppercase tracking-wider leading-relaxed">
                  We currently do not have any clocks added in the "{cleanTitle}" category.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-brand-dark hover:bg-brand-red text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-none transition-colors"
                >
                  Browse Other Clocks
                </Link>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default CategoryProducts;
