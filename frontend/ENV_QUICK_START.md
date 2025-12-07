# Environment Variables Setup

## Quick Setup

1. **Create `.env` file** in the `frontend` directory
2. **Add this line**:
   ```
   VITE_API_BASE_URL=https://employee-shift-board-ndsa.onrender.com/api
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```

## Configuration Options

### Production (Deployed Backend)
```env
VITE_API_BASE_URL=https://employee-shift-board-ndsa.onrender.com/api
```

### Local Development
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Important Notes

- ✅ `.env` file is gitignored (safe for local config)
- ✅ Always include `/api` at the end of the URL
- ✅ Restart dev server after changing `.env`
- ✅ Environment variables are embedded at build time

## Files Modified

- ✅ `src/api/client.ts` - Now uses `import.meta.env.VITE_API_BASE_URL`
- ✅ `vite.config.ts` - Removed proxy (using absolute URLs now)
- ✅ `.env.example` - Template with production URL

For detailed instructions, see [ENV_SETUP.md](./ENV_SETUP.md)
