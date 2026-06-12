import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Area */}
      <div className="aspect-square w-full bg-gray-200 flex items-center justify-center p-6" />
      
      {/* Body Area */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-full" />
          <div className="h-4 bg-gray-200 rounded-md w-5/6" />
        </div>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded-md w-10" />
            <div className="h-6 bg-gray-200 rounded-md w-16" />
          </div>
          <div className="h-10 bg-gray-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export const CategoryListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded-md w-2/3" />
        </div>
      ))}
    </div>
  );
};

const SkeletonLoader = ({ type = 'product-grid', count = 8 }) => {
  if (type === 'categories') {
    return <CategoryListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
