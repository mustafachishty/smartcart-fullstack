// For Amplify deployment, use relative paths
const API_BASE_URL = import.meta.env.PROD ? '/api' : `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api`;

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('smartcart_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async login(loginData: LoginData): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(loginData)
    });
    return response.json();
  }

  async getMe(): Promise<ApiResponse<{ user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  setToken(token: string) {
    localStorage.setItem('smartcart_token', token);
  }

  removeToken() {
    localStorage.removeItem('smartcart_token');
  }

  getToken() {
    return localStorage.getItem('smartcart_token');
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email })
    });
    return response.json();
  }

  async createOrder(orderData: any): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData)
    });
    return response.json();
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ password })
    });
    return response.json();
  }

  async deleteAccount(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  // Cart methods
  async getCart(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  }

  async updateCartItem(productId: string, quantity: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  }

  async removeFromCart(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async clearCart(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  // Wishlist methods
  async getWishlist(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async addToWishlist(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/wishlist/add/${productId}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async removeFromWishlist(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async clearWishlist(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/wishlist/clear`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.json();
  }
}

export const apiService = new ApiService();
export type { User, AuthResponse, ApiResponse };