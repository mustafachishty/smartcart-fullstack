# 🛒 SmartCart Backend API

Modern e-commerce backend built with Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- **Authentication**: JWT-based user authentication
- **Database**: MongoDB Atlas integration
- **Security**: CORS, rate limiting, input validation
- **API**: RESTful endpoints for products, cart, orders
- **Real-time**: Ready for WebSocket integration

## 🔧 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env with your MongoDB credentials

# Start development server
npm run dev

# Start production server
npm start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)

### Cart & Orders
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/orders/create` - Create order

## 🌐 Environment Variables

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

## 🚀 Deployment

Ready for deployment on Render, Railway, or any Node.js hosting platform.

## 📝 License

MIT License