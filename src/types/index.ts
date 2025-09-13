export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications: { [key: string]: string };
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

export interface SortOption {
  label: string;
  value: string;
  field: keyof Product;
  direction: 'asc' | 'desc';
}