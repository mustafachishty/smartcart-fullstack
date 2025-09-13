import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { apiService } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'TOGGLE_CART' };

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>('cart', []);
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // Load cart from backend if user is logged in, otherwise from localStorage
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const response = await apiService.getCart();
          if (response.success && response.data) {
            const backendItems = response.data.items?.map((item: any) => ({
              product: item.productId,
              quantity: item.quantity
            })) || [];
            dispatch({ type: 'LOAD_CART', payload: backendItems });
          }
        } catch (error) {
          console.error('Failed to load cart from backend:', error);
          dispatch({ type: 'LOAD_CART', payload: storedCart });
        }
      } else {
        dispatch({ type: 'LOAD_CART', payload: storedCart });
      }
    };
    
    loadCart();
  }, [user, storedCart]);

  // Save to localStorage for non-authenticated users
  useEffect(() => {
    if (!user) {
      setStoredCart(state.items);
    }
  }, [state.items, setStoredCart, user]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (user) {
      try {
        const response = await apiService.addToCart(product.id, quantity);
        if (response.success) {
          const backendItems = response.data.items?.map((item: any) => ({
            product: item.productId,
            quantity: item.quantity
          })) || [];
          dispatch({ type: 'LOAD_CART', payload: backendItems });
          showSuccess('Item added to cart!');
        } else {
          showError(response.error || 'Failed to add item to cart');
        }
      } catch (error) {
        console.error('Failed to add to cart:', error);
        showError('Failed to add item to cart');
      }
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
      showSuccess('Item added to cart!');
    }
  };

  const removeFromCart = async (productId: string) => {
    console.log('Removing product:', productId, 'User:', user);
    if (user) {
      try {
        console.log('Calling backend remove API');
        const response = await apiService.removeFromCart(productId);
        console.log('Backend response:', response);
        if (response.success) {
          const backendItems = response.data.items?.map((item: any) => ({
            product: item.productId,
            quantity: item.quantity
          })) || [];
          console.log('Updated cart items:', backendItems);
          dispatch({ type: 'LOAD_CART', payload: backendItems });
          showSuccess('Item removed from cart');
        } else {
          console.log('Backend error:', response.error);
          showError(response.error || 'Failed to remove item');
        }
      } catch (error) {
        console.error('Failed to remove from cart:', error);
        // Fallback to local removal if backend fails
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        showError('Failed to remove item');
      }
    } else {
      console.log('Removing locally (no user)');
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      showSuccess('Item removed from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (user) {
      try {
        const response = await apiService.updateCartItem(productId, quantity);
        if (response.success) {
          const backendItems = response.data.items?.map((item: any) => ({
            product: item.productId,
            quantity: item.quantity
          })) || [];
          dispatch({ type: 'LOAD_CART', payload: backendItems });
        } else {
          showError(response.error || 'Failed to update quantity');
        }
      } catch (error) {
        console.error('Failed to update quantity:', error);
        showError('Failed to update quantity');
      }
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const response = await apiService.clearCart();
        if (response.success) {
          dispatch({ type: 'CLEAR_CART' });
          showSuccess('Cart cleared');
        } else {
          showError(response.error || 'Failed to clear cart');
        }
      } catch (error) {
        console.error('Failed to clear cart:', error);
        showError('Failed to clear cart');
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
      showSuccess('Cart cleared');
    }
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen: state.isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};