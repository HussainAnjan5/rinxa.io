# 🚀 Quick Start Guide

## Immediate Actions Required

### 1. Configure Clerk Authentication

1. Go to https://clerk.com/ and sign up
2. Create a new application
3. Copy your keys from the API  Keys section
4. Update **TWO** `.env` files:

**Root `.env`:**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOURKEY
VITE_ADMIN_EMAILS=your-email@example.com
```

**`server/.env`:**
```
CLERK_SECRET_KEY=sk_test_YOURKEY
CLERK_PUBLISHABLE_KEY=pk_test_YOURKEY
ADMIN_EMAILS=your-email@example.com
```

### 2. Whitelist IP in MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Click on your cluster
3. Go to **Network Access** → **IP Access List**
4. Click **"Add IP Address"**
5. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Confirm"**

### 3. Seed the Database

```powershell
cd server
npm run build
node dist/scripts/seedBlogPosts.js
cd ..
```

### 4. Start the Application

```powershell
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Test the Setup

1. **Public Blog:** Visit `http://localhost:5173/#/blog`
   - Should show 6 blog posts from the database

2. **Admin Login:** Visit `http://localhost:5173/#/admin/sign-in`
   - Sign up with the email you configured in `ADMIN_EMAILS`

3. **Create a Post:** After login, click "Create New Post"
   - Test the WYSIWYG editor
   - Upload an image (if Cloudinary configured)
   - Save the post

4. **View Your Post:** Go back to `/blog`
   - Your new post should appear!

---

## Optional: Configure Cloudinary (for image uploads)

1. Sign up at https://cloudinary.com/
2. Get your credentials from the dashboard
3. Update `server/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note:** Without Cloudinary, you can still paste image URLs manually.

---

## Common Issues

### ❌ MongoDB Connection Error
**Fix:** Whitelist your IP in MongoDB Atlas (step 2 above)

### ❌ Clerk Auth Not Working
**Fix:** Make sure you updated BOTH `.env` files with your Clerk keys

### ❌ "Access Denied" when accessing /admin
**Fix:** Your email must be in the `ADMIN_EMAILS` list in both `.env` files

---

## File Structure Summary

```
📁 Root (.env) ← Clerk Publishable Key + Admin Emails
📁 server/
   └── .env ← Clerk Secret Key + MongoDB + Cloudinary
   └── src/ ← Backend code
📁 src/
   └── pages/admin/ ← Admin panel UI
   └── services/api.ts ← API calls
```

---

## Need More Help?

See the full `SETUP.md` file for detailed documentation.

---

**You're all set! Follow the 4 steps above and you'll be blogging in minutes! 🎉**
