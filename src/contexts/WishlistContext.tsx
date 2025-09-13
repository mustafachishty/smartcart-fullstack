import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { apiService } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface WishlistState {
  items: Product[];
}

interface WishlistContextType extends WishlistState {
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: Product[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [savedWishlist, setSavedWishlist] = useLocalStorage<Product[]>('wishlist', []);
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // Load wishlist from backend if user is logged in, otherwise from localStorage
  React.useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const response = await apiService.getWishlist();

          if (response.success && response.data) {
            const backendItems = response.data.items || [];

            dispatch({ type: 'LOAD_WISHLIST', payload: backendItems });
          }
        } catch (error) {
          console.error('Failed to load wishlist from backend:', error);
          dispatch({ type: 'LOAD_WISHLIST', payload: savedWishlist });
        }
      } else {
        dispatch({ type: 'LOAD_WISHLIST', payload: savedWishlist });
      }
    };
    
    loadWishlist();
  }, [user, savedWishlist]);

  // Save to localStorage for non-authenticated users
  React.useEffect(() => {
    if (!user && state.items.length >= 0) {
      setSavedWishlist(state.items);
    }
  }, [state.items, setSavedWishlist, user]);

  const addToWishlist = async (product: Product) => {
    if (user) {
      try {
        const response = await apiService.addToWishlist(product.id);
        if (response.success) {
          const backendItems = response.data.items || [];

          dispatch({ type: 'LOAD_WISHLIST', payload: backendItems });
          showSuccess('Added to wishlist!');
        } else {
          showError(response.error || 'Failed to add to wishlist');
        }
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
        showError('Failed to add to wishlist');
      }
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      showSuccess('Added to wishlist!');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (user) {
      try {
        const response = await apiService.removeFromWishlist(productId);
        if (response.success) {
          const backendItems = response.data.items || [];

          dispatch({ type: 'LOAD_WISHLIST', payload: backendItems });
          showSuccess('Removed from wishlist');
        } else {
          showError(response.error || 'Failed to remove from wishlist');
        }
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
        showError('Failed to remove from wishlist');
      }
    } else {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
      showSuccess('Removed from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (user) {
      try {
        const response = await apiService.clearWishlist();
        if (response.success) {
          dispatch({ type: 'CLEAR_WISHLIST' });
          showSuccess('Wishlist cleared');
        } else {
          showError(response.error || 'Failed to clear wishlist');
        }
      } catch (error) {
        console.error('Failed to clear wishlist:', error);
        showError('Failed to clear wishlist');
      }
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
      showSuccess('Wishlist cleared');
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};