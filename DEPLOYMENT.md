# Deployment Guide

## Architecture
This project has two separate deployments:
1. **Frontend** (Vite/React) - Main site at www.rinxa.io
2. **Backend** (Express/MongoDB) - API server

## Deploy Backend First

### 1. Deploy Backend to Vercel

```bash
cd server
vercel
```

Follow prompts and note the deployment URL (e.g., `https://rinxa-api.vercel.app`)

### 2. Add Backend Environment Variables in Vercel

Go to Vercel Dashboard > Project Settings > Environment Variables:

```
MONGODB_URI=mongodb+srv://...your-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URLS=https://www.rinxa.io,https://rinxa.io,http://localhost:5173
NODE_ENV=production
```

### 3. Redeploy backend with environment variables
```bash
vercel --prod
```

## Deploy Frontend

### 1. Add Frontend Environment Variable in Vercel

Go to Vercel Dashboard > Frontend Project > Settings > Environment Variables:

```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Example:**
```
VITE_API_URL=https://rinxa-api.vercel.app/api
```

### 2. Redeploy Frontend

Push to GitHub or run:
```bash
vercel --prod
```

## Verify Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend-url.vercel.app/api/health
   ```
   Should return: `{"status":"OK"}`

2. **Test Frontend:**
   - Visit https://www.rinxa.io/blog
   - Check browser console for API calls
   - Verify blogs are loading from MongoDB

## Current Issue

**Problem:** Frontend is deployed but not connecting to backend because `VITE_API_URL` environment variable is not set in Vercel.

**Solution:** 
1. Find your backend deployment URL in Vercel dashboard
2. Add `VITE_API_URL` environment variable to frontend project in Vercel
3. Trigger a redeploy of the frontend

## Local Development

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend  
npm install
npm run dev
```
