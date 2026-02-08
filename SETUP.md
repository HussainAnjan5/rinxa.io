# Rinxa.io Blog Admin Panel - Setup Guide

## 🎉 Implementation Complete!

Your blog admin panel has been successfully implemented with:
- ✅ Node.js + Express backend
- ✅ MongoDB database with Mongoose
- ✅ Clerk authentication
- ✅ Full CRUD operations for blog posts
- ✅ Rich text editor (React-Quill)
- ✅ Image upload support (Cloudinary)
- ✅ Admin dashboard with search and filters
- ✅ Protected routes
- ✅ API integration in frontend

---

## 📋 Prerequisites

Before running the application, you need to set up the following services:

### 1. MongoDB Atlas (Database)
- ✅ Connection string already configured
- ⚠️ **ACTION REQUIRED:** Whitelist your IP address
  1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
  2. Navigate to: **Network Access** → **IP Access List**
  3. Click **"Add IP Address"**
  4. Choose **"Allow Access from Anywhere"** (0.0.0.0/0) for development
  5. Click **"Confirm"**

### 2. Clerk Authentication
1. Go to [Clerk.com](https://clerk.com/) and create a free account
2. Create a new application
3. Copy your API keys from the dashboard
4. Update `.env` files (see Configuration section below)

### 3. Cloudinary (Optional - for image uploads)
1. Go to [Cloudinary.com](https://cloudinary.com/) and create a free account
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Update `server/.env` file (see Configuration section below)

---

## ⚙️ Configuration

### Frontend Environment Variables
Edit `.env` in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAILS=your-email@example.com,another-admin@example.com
```

### Backend Environment Variables  
Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://HussainAnjan:Testing@12345@hussain.xzv2d.mongodb.net/rinxa-blog?retryWrites=true&w=majority
NODE_ENV=development

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key

# Cloudinary (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Emails (comma-separated list)
ADMIN_EMAILS=your-email@example.com,another-admin@example.com
```

**Important:** Replace all `your_` placeholders with actual credentials.

---

## 🚀 Getting Started

### Step 1: Install Dependencies

```powershell
# Install frontend dependencies (already done)
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Seed the Database

```powershell
cd server
node dist/scripts/seedBlogPosts.js
cd ..
```

This will populate your MongoDB database with the existing blog posts.

### Step 3: Start the Application

```powershell
# Run both frontend and backend concurrently
npm run dev
```

This starts:
- Frontend on `http://localhost:5173`
- Backend API on `http://localhost:5000`

---

## 📱 Application URLs

- **Public Blog:** `http://localhost:5173/#/blog`
- **Admin Login:** `http://localhost:5173/#/admin/sign-in`
- **Admin Dashboard:** `http://localhost:5173/#/admin`
- **Create Post:** `http://localhost:5173/#/admin/create`

---

## 🔐 Admin Access

Only users with email addresses listed in the `ADMIN_EMAILS` environment variable can access the admin panel.

**To add an admin:**
1. Update `ADMIN_EMAILS` in both `.env` files
2. Restart the servers
3. The user can now sign in at `/admin/sign-in`

---

## 📝 Using the Admin Panel

### Creating a Blog Post

1. Navigate to `/admin`
2. Click **"Create New Post"**
3. Fill in the form:
   - **Title:** Auto-generates slug
   - **Slug:** URL-friendly identifier
   - **Excerpt:** Short summary (shown on blog listing)
   - **Content:** Use the WYSIWYG editor
   - **Thumbnail:** Paste URL or upload image
   - **Category:** Choose from dropdown
   - **Read Time:** Estimate (e.g., "5 min read")
   - **Author Info:** Name, avatar URL, and bio
   - **Tags:** Add relevant keywords
4. Click **"Create Post"**

### Editing a Post

1. Go to `/admin` dashboard
2. Click the **pencil icon** next to any post
3. Make your changes
4. Click **"Update Post"**

### Deleting a Post

1. Go to `/admin` dashboard
2. Click the **trash icon** next to any post
3. Confirm deletion

### Searching and Filtering

- Use the **search bar** to find posts by title, excerpt, or tags
- Use **category dropdown** to filter by category

---

## 🖼️ Image Upload

### Using Cloudinary (Recommended)

1. Configure Cloudinary credentials in `server/.env`
2. Click **"Upload"** button in the admin form
3. Images are automatically uploaded to Cloudinary CDN
4. The URL is inserted into the thumbnail field

### Without Cloudinary

- Manually paste image URLs from external sources (Unsplash, Imgur, etc.)
- Or use any image hosting service

---

## 🛠️ API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/blogs` | Public | Get all posts (with filters) |
| GET | `/api/blogs/slug/:slug` | Public | Get single post by slug |
| GET | `/api/blogs/category/:category` | Public | Get posts by category |
| GET | `/api/blogs/latest` | Public | Get latest posts |
| POST | `/api/blogs` | Admin | Create new post |
| PUT | `/api/blogs/:id` | Admin | Update post |
| DELETE | `/api/blogs/:id` | Admin | Delete post |
| POST | `/api/upload` | Admin | Upload image |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseServerSelectionEror: Could not connect...`

**Solution:**
- Whitelist your IP in MongoDB Atlas (see Prerequisites section)
- Make sure the connection string in `server/.env` is correct

### Clerk Authentication Error
**Error:** `Invalid publishable key` or auth not working

**Solution:**
- Make sure `VITE_CLERK_PUBLISHABLE_KEY` in `.env` is correct
- Make sure `CLERK_SECRET_KEY` in `server/.env` is correct
- Restart both servers after updating environment variables

### Admin Access Denied
**Error:** `Access denied. Admin only.`

**Solution:**
- Add your email to `ADMIN_EMAILS` in both `.env` files
- Make sure the email matches the one you signed up with in Clerk
- Restart the servers

### Port Already in Use
**Error:** `Port 5000 is already in use` or `Port 5173 is  already in use`

**Solution:**
```powershell
# Stop any running Node processes
Get-Process node | Stop-Process

# Or change the ports in vite.config.ts and server/src/index.ts
```

### React-Quill Compatibility Warning
**Warning:** `react-quill@2.0.0 requires react ^16 || ^17 || ^18`

**Solution:** This is expected behavior (using --legacy-peer-deps). React-Quill works fine with React 19 despite the warning.

---

## 📦 Project Structure

```
Rinxa.io-main/
├── server/                    # Backend
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── scripts/          # Seed scripts
│   │   └── index.ts          # Server entry point
│   ├── .env                  # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── components/           # React components
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── admin/           # Admin panel pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BlogPostForm.tsx
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── Blog.tsx         # Public blog listing (updated)
│   │   ├── BlogPost.tsx     # Single post view (updated)
│   │   └── ...
│   ├── services/
│   │   └── api.ts           # API service layer
│   └── ...
│
├── .env                      # Frontend environment variables
├── App.tsx                   # Main app with Clerk provider
├── package.json
└── vite.config.ts           # Vite config with proxy

```

---

## 🔄 Development Workflow

### Making Changes

1. **Backend changes:** Edit files in `server/src/`
2. **Frontend changes:** Edit files in `src/`
3. Both servers auto-reload on file changes (hot reload)

### Building for Production

```powershell
# Build frontend
npm run build

# Build backend
npm run build:server

# Start production server
npm run start:server
```

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [React-Quill Documentation](https://github.com/zenoamaro/react-quill)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

## 🎯 Next Steps

1. **Configure Clerk:** Get your API keys and update environment variables
2. **Whitelist IP:** Add your IP to MongoDB Atlas
3. **Seed Database:** Run the seed script to populate initial data
4. **Test the app:** Start servers and test creating/editing/deleting posts
5. **(Optional) Configure Cloudinary:** Set up image uploads
6. **Deploy:** When ready, deploy to Vercel/Netlify (frontend) and Railway/Render (backend)

---

## ✅ Verification Checklist

Before starting, make sure:

- [ ] MongoDB Atlas IP is whitelisted
- [ ] Clerk account created and API keys obtained
- [ ] both `.env` files configured
- [ ] Dependencies installed (`npm install` in root and `server/`)
- [ ] Database seeded with existing posts
- [ ] Both servers running (`npm run dev`)

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Make sure all dependencies are installed
4. Check browser console and terminal for error messages
5. Restart the servers after making configuration changes

---

**Built with:**
- React 19 + TypeScript
- Node.js + Express
- MongoDB + Mongoose
- Clerk Authentication
- React-Quill WYSIWYG Editor
- Tailwind CSS
- Cloudinary (optional)
