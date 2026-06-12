import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const CategoryProducts = () => {
  const { slug } = useParams();
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

  // Find category matching the URL slug
  const activeCategory = categories.find(
    (cat) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  ) || '';

  useEffect(() => {
    if (activeCategory) {
      setFilters({ category: activeCategory, page: 1, limit: 100 }); // Fetch all items for this category
    }
  }, [activeCategory, slug]);

  const cleanTitle = activeCategory || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-brand-light py-12 min-h-screen">
      <SEO 
        title={`${cleanTitle} Collections | Nilkanth Quartz`}
        description={`Explore our elegant premium collections of ${cleanTitle} wall clocks. Precision crafted with silent sweep technology.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back and Page Header */}
        <div className="mb-10 space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-red font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Products
          </Link>
          
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{cleanTitle} Collection</h1>
            <p className="text-gray-500 text-sm mt-1">
              Showing premium designs registered under our {cleanTitle} range.
            </p>
          </div>
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
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">No Clocks Yet</h3>
                <p className="text-gray-500 text-sm">
                  We currently do not have any clocks added in the "{cleanTitle}" category.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
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
