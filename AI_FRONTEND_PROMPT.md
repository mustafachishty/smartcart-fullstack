# 🚀 AI Frontend Development Prompt (Bolt.new Style)

## 📋 **Complete E-Commerce Frontend Specification**

Create a **professional e-commerce website frontend** with the following exact features and functionality:

### 🎯 **Core Requirements**

**Tech Stack**: React + TypeScript + Tailwind CSS + Framer Motion + Vite

### 🏗️ **Project Structure**
```
src/
├── components/
│   ├── common/ (Header, Footer, ErrorBoundary, LoadingSpinner)
│   ├── product/ (ProductCard, ProductGrid, ProductFilters, Product3DViewer)
│   ├── cart/ (CartIcon, CartItem, CartSidebar)
│   ├── ui/ (Button, Input, Modal, DarkModeToggle, Newsletter, ImageSlider)
│   └── admin/ (AdminDashboard, ProductForm, ProductList)
├── contexts/ (ThemeContext, CartContext, ProductContext, WishlistContext)
├── pages/ (HomePage, ProductsPage, ProductDetailPage, CartPage, AdminPage, NotFoundPage)
├── hooks/ (useLocalStorage)
├── types/ (index.ts)
├── utils/ (constants.ts, localStorage.ts)
└── data/ (mockProducts.ts)
```

### 🎨 **Design Requirements**

1. **Responsive Design**: Mobile-first, works on all screen sizes
2. **Dark/Light Mode**: Toggle with smooth transitions
3. **Professional UI**: Modern, clean, premium look
4. **Smooth Animations**: Framer Motion for all interactions
5. **Color Scheme**: Blue/Purple gradients, professional palette

### ⚡ **Key Features to Implement**

#### 🏠 **Homepage**
- **Auto-sliding hero carousel** (4 images, 4-second intervals)
- Navigation arrows + dot indicators
- Animated gradient text effects
- Features section with icons (Quality, Security, Shipping, Support)
- Featured products grid (4 products)
- **Animated newsletter subscription** with success animation

#### 🛍️ **Product Features**
- Product grid with hover animations
- **Working wishlist/favorites** (heart icon, localStorage persistence)
- Add to cart functionality
- Product filtering and sorting
- Search functionality
- Product detail pages with image gallery

#### 🛒 **Shopping Cart**
- Cart sidebar with smooth slide animation
- Add/remove/update quantities
- Cart persistence in localStorage
- Checkout button (UI only)
- Cart icon with item count badge

#### 🌙 **Theme System**
- **Fully functional dark/light mode toggle**
- Smooth color transitions
- Persistent theme preference
- All components adapt to theme

#### 📱 **Navigation**
- **Animated logo** with hover effects and rotating elements
- Responsive mobile menu
- Search bar in header
- Breadcrumb navigation

#### 🎭 **Animations & Interactions**
- Smooth page transitions
- Hover effects on all interactive elements
- Loading states with spinners
- Success/error message animations
- Parallax effects where appropriate

### 🔧 **Technical Specifications**

#### **State Management**
- React Context for global state
- localStorage for persistence
- Proper error boundaries

#### **Performance**
- Optimized re-renders with useMemo/useCallback
- Lazy loading for images
- Code splitting where beneficial
- No animation lag or blinking

#### **Data Structure**
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  tags: string[];
  specifications: Record<string, string>;
}
```

### 🎯 **Specific Component Requirements**

#### **ImageSlider Component**
- 4 high-quality images from Unsplash
- Auto-advance every 4 seconds
- Manual navigation (arrows + dots)
- Smooth fade transitions
- Overlay text with titles/descriptions

#### **Newsletter Component**
- Email input with validation
- Loading animation on submit
- **Success animation**: rotating checkmark, sparkles, gradient text
- Auto-reset after 4 seconds
- Animated background elements

#### **ProductCard Component**
- Hover animations (lift effect)
- **Working wishlist toggle** (heart icon)
- Quick add to cart button
- Sale badges
- Star ratings display
- Image error handling

#### **Header Component**
- **Animated logo** with gradient, rotation, hover effects
- Dark mode toggle
- Cart icon with count
- Responsive mobile menu
- Search functionality

### 🎨 **Animation Guidelines**
- Use `framer-motion` for all animations
- Smooth transitions (0.2-0.3s duration)
- `viewport={{ once: true }}` to prevent re-triggers
- Hover effects on interactive elements
- Loading states for async operations

### 📦 **Mock Data Requirements**
- 12+ diverse products across categories
- High-quality product images
- Realistic pricing and descriptions
- Various categories (Electronics, Fashion, Home, etc.)

### 🔍 **Testing Requirements**
- All features must work without errors
- Dark mode toggle functional
- Wishlist persistence works
- Cart operations work
- Newsletter submission works
- Mobile responsive
- No console errors

### 🚀 **Deployment Ready**
- Vite build configuration
- Optimized bundle size
- Production-ready code
- Clean, maintainable structure

---

## 💡 **AI Implementation Instructions**

**Generate a complete, working e-commerce frontend that:**
1. ✅ Has ALL features listed above
2. ✅ Uses modern React patterns and TypeScript
3. ✅ Includes smooth animations and professional design
4. ✅ Works perfectly on mobile and desktop
5. ✅ Has no bugs or console errors
6. ✅ Includes comprehensive mock data
7. ✅ Ready to run with `npm run dev`

**Focus on**: Professional UI/UX, smooth performance, complete functionality, and modern development practices.