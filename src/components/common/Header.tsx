import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, ShoppingCart, Home, Package, Settings } from 'lucide-react';
import { DarkModeToggle } from '../ui/DarkModeToggle';
import { CartIcon } from '../cart/CartIcon';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { UserMenu } from '../auth/UserMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { setSearchQuery: setGlobalSearchQuery } = useProducts();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery);
    navigate('/products');
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-700/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative z-10">
            <motion.div
              whileHover={{ 
                scale: 1.15,
                rotate: [0, -10, 10, -10, 0],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/25"
            >
              <motion.div
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #10b981, #06b6d4, #3b82f6)",
                    "linear-gradient(45deg, #3b82f6, #8b5cf6, #10b981)",
                    "linear-gradient(45deg, #10b981, #06b6d4, #3b82f6)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <ShoppingCart className="relative z-10 text-white w-6 h-6" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
            >
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:via-cyan-500 group-hover:to-blue-500 transition-all duration-300"
              >
                SmartCart
              </motion.span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                Smart Shopping
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.path} className="relative">
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-300 group text-sm ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon size={16} className={`transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'text-white' : ''
                    }`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <motion.form 
              onSubmit={handleSearch} 
              className="w-full relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search amazing products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 shadow-sm group-hover:shadow-md"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Search
              </button>
            </motion.form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <DarkModeToggle />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CartIcon />
            </motion.div>
            
            {/* User Menu */}
            <div className="hidden md:flex items-center">
              {isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthModal(true);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/25"
                    >
                      <User size={16} />
                      <span className="font-medium">Sign In</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/25"
                    >
                      <span className="font-medium">Sign Up</span>
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 rounded-b-2xl shadow-xl"
            >
              <div className="p-6 space-y-6">
                {/* Mobile Search */}
                <motion.form 
                  onSubmit={handleSearch} 
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </motion.form>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                          }`}
                        >
                          <Icon size={20} />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {!isAuthenticated ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setShowAuthModal(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 w-full"
                        >
                          <User size={20} />
                          <span>Sign In</span>
                        </button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button
                          onClick={() => {
                            setAuthMode('signup');
                            setShowAuthModal(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 w-full"
                        >
                          <User size={20} />
                          <span>Sign Up</span>
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="px-4 py-3"
                    >
                      <UserMenu />
                    </motion.div>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </motion.header>
  );
};