# Environment Configuration Guide

## 🌍 Backend URL Configuration

The frontend is now configured to use environment variables for the backend API URL. This allows you to easily switch between local development and production environments.

## 📝 Setup Instructions

### Step 1: Create `.env` File

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
copy .env.example .env
```

Or manually create `frontend/.env` with:

```env
VITE_API_BASE_URL=https://employee-shift-board-ndsa.onrender.com/api
```

### Step 2: Configure for Your Environment

**For Production (Deployed Backend):**
```env
VITE_API_BASE_URL=https://employee-shift-board-ndsa.onrender.com/api
```

**For Local Development:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Restart Dev Server

After creating or modifying `.env`, restart the development server:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 🔧 How It Works

### API Client Configuration

The `src/api/client.ts` file now reads the base URL from environment variables:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    // ...
});
```

### Fallback Behavior

- If `VITE_API_BASE_URL` is set in `.env`, it will be used
- If not set, it defaults to `http://localhost:5000/api`

## 🚀 Deployment

### For Production Build

When building for production, make sure your `.env` file contains the production backend URL:

```bash
# frontend/.env
VITE_API_BASE_URL=https://employee-shift-board-ndsa.onrender.com/api

# Build
npm run build
```

The environment variable will be embedded in the build at build time.

### For Different Environments

You can create multiple environment files:

- `.env` - Default (gitignored)
- `.env.local` - Local overrides (gitignored)
- `.env.production` - Production settings
- `.env.development` - Development settings

Vite automatically loads the appropriate file based on the mode.

## ✅ Verification

### Check Current Configuration

Add this temporarily to see which URL is being used:

```typescript
// In src/api/client.ts (for debugging)
console.log('API Base URL:', API_BASE_URL);
```

### Test API Connection

1. Start the frontend: `npm run dev`
2. Open browser console (F12)
3. Try to login
4. Check Network tab to see API requests going to the correct URL

## 🔒 Security Notes

### Important: `.env` is Gitignored

The `.env` file is automatically ignored by git (listed in `.gitignore`). This is important because:

- Different developers may use different backend URLs
- Production secrets should not be committed
- Each environment can have its own configuration

### Environment Variables in Vite

- All Vite environment variables must start with `VITE_`
- They are embedded in the build at build time
- They are publicly accessible in the browser
- **Never put secrets in frontend environment variables**

## 📋 Quick Reference

### Current Setup

```
Production Backend: https://employee-shift-board-ndsa.onrender.com
Local Backend:      http://localhost:5000
Frontend Port:      3000
```

### File Locations

```
frontend/
├── .env                 # Your local config (create this)
├── .env.example         # Template file (committed to git)
├── src/api/client.ts    # Uses VITE_API_BASE_URL
└── vite.config.ts       # No proxy needed anymore
```

### Environment Variable

```
VITE_API_BASE_URL=<your-backend-url>/api
```

**Note:** Always include `/api` at the end of the URL!

## 🐛 Troubleshooting

### Issue: API calls failing with CORS errors

**Solution:** Make sure your backend has CORS configured to allow requests from your frontend domain.

### Issue: Changes to `.env` not taking effect

**Solution:** Restart the dev server. Environment variables are loaded at startup.

### Issue: Build using wrong URL

**Solution:** Check your `.env` file exists and has the correct URL before building.

### Issue: 404 errors on API calls

**Solution:** Verify the backend URL is correct and includes `/api` at the end.

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vite Config Reference](https://vitejs.dev/config/)

## ✅ Checklist

- [ ] Created `frontend/.env` file
- [ ] Set `VITE_API_BASE_URL` to your backend URL
- [ ] Restarted dev server
- [ ] Verified API calls go to correct URL
- [ ] Tested login functionality
- [ ] Confirmed CORS is working

## 🎉 You're All Set!

Your frontend is now configured to use the deployed backend at:
**https://employee-shift-board-ndsa.onrender.com**

Start the dev server and test the application!

```bash
npm run dev
```
