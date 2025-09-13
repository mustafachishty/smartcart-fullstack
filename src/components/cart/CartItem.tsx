import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <img
        src={product.images?.[0] || product.image || 'https://via.placeholder.com/64x64?text=No+Image'}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={async () => await updateQuantity(product.id, quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          disabled={quantity <= 1}
        >
          <Minus size={16} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'} />
        </button>
        
        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
          {quantity}
        </span>
        
        <button
          onClick={async () => await updateQuantity(product.id, quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Plus size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <button
        onClick={async () => await removeFromCart(product.id)}
        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};