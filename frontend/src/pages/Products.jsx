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

  // Sync category from URL query parameters
  useEffect(() => {
    fetchCategories();
    
    const catQuery = searchParams.get('category');
    if (catQuery) {
      setFilters({ category: catQuery, page: 1 });
    } else {
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
    <div className="bg-[#FCFCFC] py-0 min-h-screen select-none">
      <SEO 
        title="Browse Products | Nilkanth Quartz Wall Clocks" 
        description="Search and filter our complete catalog of designer, office, promotional, acrylic, and gear wall clocks. Find the perfect fit for your home or business."
      />

      {/* Catalog Page Header Banner */}
      <div className="bg-brand-dark text-white pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-white/10 mb-12 min-h-[340px] sm:min-h-[300px] lg:min-h-[260px] flex flex-col justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                CATALOG
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight uppercase">
              OUR CLOCK COLLECTION
            </h1>
            <p className="text-gray-300 text-xs font-medium uppercase tracking-wider max-w-xl">
              Explore our comprehensive range of high-quality corporate and retail wall clocks.
            </p>
          </div>
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="SEARCH CLOCKS..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-brand-dark border border-white/20 text-white rounded-none pl-11 pr-24 py-3.5 text-xs font-bold uppercase tracking-wider placeholder-gray-500 focus:border-brand-red focus:outline-none transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red hover:bg-brand-red/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Toolbar Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-[#EEEEEE] pb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-none border border-[#CCCCCC] text-xs font-bold uppercase tracking-wider hover:border-black transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-3 flex-grow sm:flex-grow-0">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#888888] hidden sm:block">SORT BY</label>
              <select
                value={filters.sort}
                onChange={handleSortChange}
                className="bg-white border border-[#CCCCCC] rounded-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:border-black focus:outline-none w-full sm:w-auto"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="name_asc">Model Number (A - Z)</option>
                <option value="name_desc">Model Number (Z - A)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              title="Reset all filters"
              className="p-2.5 bg-white border border-[#CCCCCC] hover:border-black hover:text-black rounded-none transition-all shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar Filters - Desktop */}
          <aside className={`lg:col-span-3 mb-12 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 border border-[#EEEEEE] rounded-none shadow-sm space-y-6 sticky top-28">
              <div>
                <h3 className="font-bold text-[#111111] text-xs uppercase tracking-widest border-b border-[#EEEEEE] pb-3 mb-4">
                  Categories
                </h3>
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      setFilters({ category: '', page: 1 });
                      setSearchParams({});
                    }}
                    className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all border-b border-gray-100 ${
                      !filters.category
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
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
                        className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all border-b border-gray-100 ${
                          isSelected 
                            ? 'bg-black text-white' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                  {categories.length === 0 && (
                    <span className="text-xs text-gray-400 italic p-4">No categories found</span>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-12 mb-12">
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
                  <div className="bg-white border border-[#EEEEEE] rounded-none p-16 text-center space-y-6 shadow-sm">
                    <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">No Clocks Found</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-wider max-w-xs mx-auto leading-relaxed">
                      We couldn't find any clocks matching your criteria. Try adjusting your query or resetting filters.
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-none transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-8 border-t border-[#EEEEEE] flex-wrap">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2.5 bg-white border border-[#CCCCCC] hover:border-black disabled:opacity-40 disabled:hover:border-[#CCCCCC] rounded-none transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = currentPage === pageNum;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-none text-xs font-bold transition-all border ${
                              isCurrent 
                                ? 'bg-black border-black text-white shadow-sm' 
                                : 'bg-white border-[#CCCCCC] text-gray-600 hover:border-black hover:text-black'
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
                      className="p-2.5 bg-white border border-[#CCCCCC] hover:border-black disabled:opacity-40 disabled:hover:border-[#CCCCCC] rounded-none transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
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
