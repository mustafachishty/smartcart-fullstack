import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 space-y-1 z-10">
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                Sale
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 z-10"
          >
            <Heart 
              size={16} 
              className={`transition-colors duration-200 ${
                isWishlisted 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600 dark:text-gray-400'
              }`} 
            />
          </button>

          {/* Quick add to cart */}
          <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800"
              size="sm"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};