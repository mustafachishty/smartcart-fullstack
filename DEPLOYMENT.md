# 🚀 SmartCart Deployment Guide

## 📁 **Repository Setup**

### 1. Create Two GitHub Repositories
```bash
# Frontend Repository
smartcart-frontend

# Backend Repository  
smartcart-backend
```

### 2. Push Code to GitHub
```bash
# Backend
cd smartcart-backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/yourusername/smartcart-backend.git
git push -u origin main

# Frontend
cd ../
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/yourusername/smartcart-frontend.git
git push -u origin main
```

## 🔧 **Backend Deployment (Render)**

### 1. Deploy to Render
1. Go to [render.com](https://render.com)
2. Connect your GitHub account
3. Create new **Web Service**
4. Select `smartcart-backend` repository
5. Configure:
   - **Name**: `smartcart-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Set Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@smartcart01.mdb3bqw.mongodb.net/smartcart?retryWrites=true&w=majority&appName=smartcart01
JWT_SECRET=your_super_secret_jwt_key_change_in_production
FRONTEND_URL=https://your-smartcart-frontend.netlify.app
```

### 3. Get Backend URL
After deployment: `https://smartcart-backend-xxxx.onrender.com`

## 🎨 **Frontend Deployment (Netlify)**

### 1. Update Environment Variables
Create `.env.production`:
```
VITE_API_URL=https://your-smartcart-backend.onrender.com
```

### 2. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub account
3. Create new site from Git
4. Select `smartcart-frontend` repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### 3. Set Environment Variables
In Netlify dashboard > Site settings > Environment variables:
```
VITE_API_URL=https://your-smartcart-backend.onrender.com
```

## 🔄 **Update CORS Configuration**

### 1. Update Backend CORS
In `smartcart-backend/server.js`, update the Netlify URL:
```javascript
'https://your-actual-netlify-url.netlify.app'
```

### 2. Update Frontend API URLs
In `public/login.html`, update the production URL:
```javascript
'https://your-actual-render-url.onrender.com'
```

## ✅ **Final Steps**

1. **Test Backend**: Visit `https://your-backend.onrender.com/health`
2. **Test Frontend**: Visit `https://your-frontend.netlify.app`
3. **Test Authentication**: Try login/signup functionality
4. **Update URLs**: Replace placeholder URLs with actual deployment URLs

## 🎯 **Post-Deployment Checklist**

- [ ] Backend health endpoint working
- [ ] Frontend loads correctly
- [ ] Login/Signup working
- [ ] CORS configured properly
- [ ] Environment variables set
- [ ] MongoDB connection working
- [ ] WhatsApp widget working

Your SmartCart application is now live! 🎉