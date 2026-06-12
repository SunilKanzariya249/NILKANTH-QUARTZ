import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const Products = () => {
  const { 
    products, 
    categories, 
    loading, 
    totalPages, 
    currentPage, 
    filters, 
    setFilters, 
    resetFilters,
    fetchProducts,
    fetchCategories
  } = useProductStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Sync category from URL query parameters (e.g. from hero slides or dropdown)
  useEffect(() => {
    fetchCategories();
    
    const catQuery = searchParams.get('category');
    if (catQuery) {
      setFilters({ category: catQuery, page: 1 });
    } else {
      // If there is no category query param, clear any previously active category filter
      if (filters.category !== '') {
        setFilters({ category: '', page: 1 });
      } else {
        fetchProducts();
      }
    }
  }, [searchParams, fetchCategories]);

  // Handle local text search query submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ search: localSearch, page: 1 });
  };

  const handleCategorySelect = (cat) => {
    const nextCat = filters.category === cat ? '' : cat;
    setFilters({ category: nextCat, page: 1 });
    // Update URL param
    if (nextCat) {
      setSearchParams({ category: nextCat });
    } else {
      setSearchParams({});
    }
  };

  const handleSortChange = (e) => {
    setFilters({ sort: e.target.value, page: 1 });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setFilters({ page });
      window.scrollTo(0, 0);
    }
  };

  const handleReset = () => {
    setLocalSearch('');
    setSearchParams({});
    resetFilters();
  };

  return (
    <div className="bg-brand-light py-12 min-h-screen">
      <SEO 
        title="Browse Products | Nilkanth Quartz Wall Clocks" 
        description="Search and filter our complete catalog of designer, office, promotional, acrylic, and gear wall clocks. Find the perfect fit for your home or business."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Page Header */}
        <div className="border-b border-gray-200 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Clock Collection</h1>
            <p className="text-gray-500 text-sm">Explore our catalog of high quality wall clocks with silent sweep movement.</p>
          </div>
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search clocks..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button 
              type="submit" 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:border-brand-red transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 hidden sm:block">Sort By</label>
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-brand-red"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="name_asc">Alphabetical (A - Z)</option>
              <option value="name_desc">Alphabetical (Z - A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>

            <button
              onClick={handleReset}
              title="Reset all filters"
              className="p-2.5 bg-white border border-gray-200 hover:border-brand-red hover:text-brand-red rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Filters - Desktop */}
          <aside className={`lg:col-span-3 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 sticky top-28">
              <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-50 pb-3 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setFilters({ category: '', page: 1 });
                      setSearchParams({});
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      !filters.category
                        ? 'bg-brand-red text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-brand-light hover:text-brand-red'
                    }`}
                  >
                    All Products
                  </button>

                  {categories.map((cat) => {
                    const isSelected = filters.category === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isSelected 
                            ? 'bg-brand-red text-white' 
                            : 'text-gray-600 hover:bg-brand-light hover:text-brand-red'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                  {categories.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No categories found</span>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-12">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4 shadow-sm">
                    <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-lg font-bold text-gray-900">No Clocks Found</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      We couldn't find any clocks matching your criteria. Try adjusting your query or resetting filters.
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-6 border-t border-gray-150">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2.5 bg-white border border-gray-200 hover:border-brand-red rounded-xl disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-inherit transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-1.5">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = currentPage === pageNum;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                              isCurrent 
                                ? 'bg-brand-red text-white shadow-md shadow-brand-red/10' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2.5 bg-white border border-gray-200 hover:border-brand-red rounded-xl disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-inherit transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
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

export default Products;
