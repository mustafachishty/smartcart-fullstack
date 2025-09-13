# 🛒 SmartCart Fullstack E-commerce Platform

[![Deploy to AWS Amplify](https://img.shields.io/badge/Deploy-AWS%20Amplify-orange)](https://console.aws.amazon.com/amplify/home)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://mongodb.com/)

Modern fullstack e-commerce platform with React frontend and Node.js backend, ready for AWS Amplify deployment.

## 🚀 **Quick Deploy to AWS Amplify**

1. **Connect Repository**: Use `https://github.com/mustafachishty/smartcart-fullstack.git`
2. **Select Branch**: `main`
3. **Build Settings**: Pre-configured in `amplify.yml`
4. **Environment Variables**: See deployment guide below

## ✨ **Features**

### Frontend (React + TypeScript)
- 🎨 Modern glass morphism UI design
- 🔐 JWT authentication system
- 🛒 Shopping cart & wishlist
- 📱 Responsive mobile-first design
- 🌙 Dark/light theme toggle
- 💬 WhatsApp integration
- ⚡ Framer Motion animations

### Backend (Node.js + Express)
- 🔒 Secure JWT authentication
- 📊 MongoDB Atlas integration
- 🛡️ CORS & security middleware
- 📧 Email service integration
- 🔄 RESTful API design
- 📦 Product management system

## 🛠️ **Tech Stack**

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Vite build tool
- React Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Nodemailer

## 🌐 **Environment Variables**

### Required for Deployment:
```env
# Backend
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcart
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend
VITE_API_URL=https://your-app.amplifyapp.com
```

## 📋 **AWS Amplify Deployment Steps**

### 1. **AWS Console Setup**
- Go to AWS Amplify Console
- Choose "Host web app"
- Select "GitHub" as source

### 2. **Repository Connection**
- Repository: `mustafachishty/smartcart-fullstack`
- Branch: `main`
- Build settings: Auto-detected from `amplify.yml`

### 3. **Environment Variables**
Add all variables listed above in Amplify Console → App Settings → Environment Variables

### 4. **Deploy**
- Review settings and deploy
- Get your live URL: `https://main.xxxxxxxx.amplifyapp.com`

## 🏗️ **Project Structure**
```
smartcart-fullstack/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   └── services/          # API services
├── smartcart-backend/     # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Express middleware
│   └── server.js          # Entry point
├── amplify.yml            # Amplify build config
└── DEPLOYMENT_GUIDE.md    # Detailed deployment guide
```

## 🔧 **Local Development**

### Frontend:
```bash
npm install
npm run dev
```

### Backend:
```bash
cd smartcart-backend
npm install
npm run dev
```

## 🛡️ **Security Features**
- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Environment variable protection

## 📱 **Pages & Features**
- 🏠 **Home**: Hero section, featured products
- 🛍️ **Products**: Grid view, search, filters
- 🛒 **Cart**: Add/remove items, checkout
- 👤 **Auth**: Login/signup with validation
- 🔧 **Admin**: Product management dashboard
- 💬 **Support**: WhatsApp integration

## 🚀 **Live Demo**
After deployment, your app will be available at your Amplify URL.

## 📄 **License**
MIT License - see LICENSE file for details.

---

**Ready for production deployment on AWS Amplify! 🎉**