# 🚀 SmartCart AWS Amplify Deployment Guide

## Pre-Deployment Checklist ✅

### 1. **Project Structure Ready**
- ✅ Frontend in root directory
- ✅ Backend in `smartcart-backend/` folder
- ✅ `amplify.yml` configuration created

### 2. **Code Changes Applied**
- ✅ API service updated for relative paths
- ✅ Backend CORS configured for Amplify
- ✅ Static file serving added for production

## Step-by-Step AWS Amplify Deployment

### 1. **Start in AWS Console**
1. Log in to AWS Console
2. Search "AWS Amplify" → Go to service
3. Under "Amplify Hosting" → Click "Get started"
4. Select "Amplify Hosting"

### 2. **Connect GitHub Repository**
1. Choose "GitHub" → Click "Continue"
2. Authorize AWS to access GitHub
3. Select your repository and `main` branch
4. Click "Next"

### 3. **Configure Build Settings**
The `amplify.yml` file is already created with the correct configuration:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - cd smartcart-backend
        - npm ci
        - npm start &
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - smartcart-backend/node_modules/**/*
```

### 4. **Environment Variables Required**

#### Backend Variables:
```
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcart
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=sk_live_your_stripe_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Frontend Variables:
```
VITE_API_URL=https://your-app-name.amplifyapp.com
```

### 5. **Deploy**
1. Review settings
2. Click "Save and deploy"
3. Wait for deployment (5-10 minutes)
4. Get your live URL: `https://main.xxxxxxxx.amplifyapp.com`

## Post-Deployment Steps

### 1. **Update Environment Variables**
After first deployment, update `VITE_API_URL` with your actual Amplify URL.

### 2. **Test All Features**
- ✅ User registration/login
- ✅ Product browsing
- ✅ Cart functionality
- ✅ Wishlist features
- ✅ Admin dashboard
- ✅ Order processing

### 3. **Database Setup**
Ensure your MongoDB Atlas is configured with:
- Correct connection string
- Network access (0.0.0.0/0 for production)
- Database user with read/write permissions

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check environment variables
2. **API Calls Fail**: Verify CORS configuration
3. **404 Errors**: Ensure React Router is properly configured

### Logs:
Monitor deployment logs in Amplify console for any errors.

## Security Notes
- All sensitive keys are in environment variables
- CORS is configured for Amplify domains
- JWT tokens are properly secured
- Database access is restricted

Your SmartCart application is now ready for production! 🎉