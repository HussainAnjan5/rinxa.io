# Rinxa.io

SEO and Link Building Platform

## Live Site
- Frontend: https://rinxa.io
- Backend: [Add your backend URL here]

## Environment Variables Required

### Frontend (.env or Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend (Vercel Environment Variables)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URLS=https://www.rinxa.io,https://rinxa.io,http://localhost:5173
NODE_ENV=production
```

## Local Development
```bash
npm install
npm run dev
```

See DEPLOYMENT.md for full deployment instructions.
