# Deploy Backend to Vercel

## Prerequisites
- Vercel account
- Vercel CLI installed: `npm i -g vercel`

## Deployment Steps

### 1. Navigate to server folder
```bash
cd server
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy project?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **Project name?** Accept default or enter custom name (e.g., `rinxa-backend`)
- **In which directory is your code located?** `./` (current directory)
- **Override settings?** No

### 4. Add Environment Variables

Go to your Vercel dashboard > Project > Settings > Environment Variables and add:

```
MONGODB_URI=mongodb+srv://...your-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URLS=https://www.rinxa.io,http://localhost:5173
NODE_ENV=production
```

### 5. Redeploy with environment variables
```bash
vercel --prod
```

### 6. Note your deployment URL
It will be something like: `https://rinxa-backend.vercel.app` or `https://rinxa-backend-username.vercel.app`

### 7. Update Frontend `.env`
Replace `VITE_API_URL` in the frontend project's `.env` file:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### 8. Rebuild and redeploy frontend
```bash
cd ..
npm run build
vercel --prod
```

## Testing
Test your backend API:
```bash
curl https://your-backend-url.vercel.app/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`
