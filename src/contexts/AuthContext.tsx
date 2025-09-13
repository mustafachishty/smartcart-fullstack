import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService, User, AuthResponse } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const token = apiService.getToken();
    if (token) {
      // Verify token with backend
      apiService.getMe().then(response => {
        if (response.success && response.data) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: response.data.user, token }
          });
        } else {
          apiService.removeToken();
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }).catch(() => {
        apiService.removeToken();
        dispatch({ type: 'SET_LOADING', payload: false });
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiService.login({ email, password });
      
      if (response.success && response.data) {
        apiService.setToken(response.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data
        });
        return true;
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiService.register({ name, email, password });
      
      if (response.success && response.data) {
        apiService.setToken(response.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data
        });
        return true;
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = () => {
    apiService.removeToken();
    dispatch({ type: 'LOGOUT' });
    // Reload the page to reset all contexts and state
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};