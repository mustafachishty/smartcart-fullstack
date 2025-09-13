import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../../types';
import { CATEGORIES, PRICE_RANGES, RATING_FILTERS } from '../../utils/constants';
import { useProducts } from '../../contexts/ProductContext';

interface ProductFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ isOpen, onToggle }) => {
  const { filters, updateFilters } = useProducts();

  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilters({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    updateFilters({ rating });
  };

  const handleStockChange = (inStock: boolean) => {
    updateFilters({ inStock });
  };

  const resetFilters = () => {
    updateFilters({
      category: 'All',
      priceRange: [0, Infinity],
      rating: 0,
      inStock: false,
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={
                  filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                }
                onChange={() => handlePriceRangeChange(range.min, range.max)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Customer Rating
        </h3>
        <div className="space-y-2">
          {RATING_FILTERS.map((ratingFilter) => (
            <label key={ratingFilter.label} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === ratingFilter.value}
                onChange={() => handleRatingChange(ratingFilter.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {ratingFilter.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleStockChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Reset Filters */}
      <button
        onClick={resetFilters}
        className="w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onToggle} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <FilterContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};