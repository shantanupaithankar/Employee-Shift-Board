# Quick Start Guide - Employee Shift Board

## 🚀 5-Minute Setup

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-shift-board
JWT_SECRET=your_super_secret_jwt_key_here
```

### Step 3: Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 4: Seed Demo Users (Optional)

Visit: http://localhost:5000/api/auth/seed

### Step 5: Login

Open: http://localhost:3000

**Admin Login:**
- Email: `hire-me@anshumat.org`
- Password: `HireMe@2025!`

**Employee Login:**
- Email: `shantanu@gmail.com`
- Password: `shan2372005`

## 📋 Common Commands

### Backend
```bash
npm start          # Start server (port 5000)
node server.js     # Alternative start
```

### Frontend
```bash
npm run dev        # Development server (port 3000)
npm run build      # Production build
npm run preview    # Preview production build
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`
- For Atlas: verify connection string

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.ts`

### CORS Errors
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.ts`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Seed Users: http://localhost:5000/api/auth/seed

## 🎯 Key Features to Test

1. **Login** - Test both admin and employee accounts
2. **Admin Dashboard** - Create, view, filter, delete shifts
3. **Employee Dashboard** - View personal shifts and calendar
4. **Shift Validation** - Try creating overlapping shifts
5. **Responsive Design** - Test on mobile/tablet

## 📚 Documentation

- [Complete README](./README.md) - Full project documentation
- [Frontend README](./frontend/README.md) - Frontend-specific docs
- [File Structure](./frontend/FILE_STRUCTURE.md) - Detailed file breakdown
## ✅ Checklist

- [ ] MongoDB installed and running
- [ ] Node.js 16+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file created
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Demo users seeded
- [ ] Successfully logged in

## 🎉 You're Ready!

Your Employee Shift Board is now running. Start by logging in as an admin to create some shifts!
