import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export const CartIcon: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCart}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </motion.span>
      )}
    </motion.button>
  );
};