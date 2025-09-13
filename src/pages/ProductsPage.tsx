import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { useProducts } from '../contexts/ProductContext';
import { SORT_OPTIONS } from '../utils/constants';

export const ProductsPage: React.FC = () => {
  const { filteredProducts, loading, sortOption, setSortOption, searchQuery } = useProducts();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <ProductFilters isOpen={isFilterOpen} onToggle={() => setIsFilterOpen(!isFilterOpen)} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} products
              </div>
              
              <div className="relative">
                <select
                  value={sortOption.value}
                  onChange={(e) => {
                    const option = SORT_OPTIONS.find(opt => opt.value === e.target.value);
                    if (option) setSortOption(option);
                  }}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};