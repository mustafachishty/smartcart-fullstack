import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    { icon: User, label: 'Profile', action: () => { navigate('/profile'); setIsOpen(false); } },
    { icon: ShoppingBag, label: 'Orders', action: () => { navigate('/orders'); setIsOpen(false); } },
    { icon: Heart, label: 'Wishlist', action: () => { navigate('/wishlist'); setIsOpen(false); } },
    { icon: Settings, label: 'Settings', action: () => { navigate('/settings'); setIsOpen(false); } },
    { icon: LogOut, label: 'Sign Out', action: handleLogout, danger: true }
  ];

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/25"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name.split(' ')[0]}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.role}
          </p>
        </div>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={item.action}
                    whileHover={{ backgroundColor: item.danger ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                      item.danger 
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};