# Employee Shift Board

A full-stack web application for managing employee shifts with role-based access control. Built with **Node.js/Express** backend and **React/TypeScript** frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)

## 🎯 Overview

Employee Shift Board is a comprehensive shift management system that allows administrators to assign shifts to employees and employees to view their schedules. The application features a modern, responsive UI with glassmorphism effects and a robust RESTful API backend.

## ✨ Features

### For Administrators
- 👥 **Employee Management** - View all employees with details
- 📅 **Shift Assignment** - Create and assign shifts to employees
- 🗑️ **Shift Deletion** - Remove shifts as needed
- 🔍 **Advanced Filtering** - Filter shifts by employee and date
- 📊 **Dashboard Overview** - Complete view of all shifts and employees

### For Employees
- 📆 **Personal Schedule** - View assigned shifts
- 🗓️ **Weekly Calendar** - Navigate through weeks with calendar view
- ⏰ **Upcoming Shifts** - See next 5 upcoming shifts
- 📱 **Responsive Design** - Access from any device

### General Features
- 🔐 **Secure Authentication** - JWT-based auth with role-based access
- 🎨 **Modern UI** - Glassmorphism, gradients, smooth animations
- ⚡ **Fast Performance** - Vite for frontend, optimized backend
- 📝 **Form Validation** - 4-hour minimum shift, overlap detection
- 🌐 **RESTful API** - Clean, well-documented endpoints
- 📱 **Mobile Responsive** - Works on all screen sizes

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Styling**: Vanilla CSS with CSS Variables

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **CORS**: cors middleware

## 📁 Project Structure

```
Employee-Shift-Board/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── shiftController.js     # Shift management logic
│   ├── middleware/
│   │   └── auth.js                # JWT verification & authorization
│   ├── models/
│   │   ├── User.js                # User/Employee schema
│   │   └── Shift.js               # Shift schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── shifts.js              # Shift routes
│   │   └── employees.js           # Employee routes
│   ├── scripts/
│   │   └── check_db.js            # Database connection test
│   ├── .env                       # Environment variables
│   ├── .gitignore                 # Git ignore rules
│   ├── server.js                  # Express app entry point
│   └── package.json               # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── client.ts          # Axios instance
    │   │   ├── auth.ts            # Auth API calls
    │   │   ├── shifts.ts          # Shift API calls
    │   │   └── employees.ts       # Employee API calls
    │   ├── components/
    │   │   ├── Navbar.tsx         # Navigation bar
    │   │   ├── ProtectedRoute.tsx # Route protection
    │   │   ├── ShiftCard.tsx      # Shift display
    │   │   └── ShiftForm.tsx      # Shift creation form
    │   ├── context/
    │   │   └── AuthContext.tsx    # Auth state management
    │   ├── pages/
    │   │   ├── Login.tsx          # Login page
    │   │   ├── Register.tsx       # Registration page
    │   │   ├── AdminDashboard.tsx # Admin interface
    │   │   └── EmployeeDashboard.tsx # Employee interface
    │   ├── types/
    │   │   └── index.ts           # TypeScript interfaces
    │   ├── App.tsx                # Router setup
    │   ├── main.tsx               # Entry point
    │   └── index.css              # Design system
    ├── index.html                 # HTML template
    ├── vite.config.ts             # Vite configuration
    ├── tsconfig.json              # TypeScript config
    ├── package.json               # Frontend dependencies
    └── README.md                  # Frontend docs
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Employee-Shift-Board
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-shift-board
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs on **http://localhost:5000**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on **http://localhost:3000**

### Seed Demo Users (Optional)

Visit: **http://localhost:5000/api/auth/seed**

This creates:
- Admin user: `hire-me@anshumat.org`
- Employee user: `shantanu@gmail.com`

## 🔑 Demo Credentials

### Admin Account
- **Email**: `hire-me@anshumat.org`
- **Password**: `HireMe@2025!`
- **Access**: Full admin dashboard with all features

### Employee Account
- **Email**: `shantanu@gmail.com`
- **Password**: `shan2372005`
- **Access**: Personal dashboard with shift viewing

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST /api/auth/register
Register a new user (employee)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "employeeCode": "EMP001",
  "department": "IT"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/login
Login with email and password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET /api/auth/seed
Seed demo users (development only)

**Response:**
```json
{
  "msg": "Seeding complete"
}
```

### Shift Endpoints

#### GET /api/shifts
Get shifts (filtered by user role)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters (Admin only):**
- `employee` - Filter by employee ID
- `date` - Filter by date (YYYY-MM-DD)

**Response:**
```json
[
  {
    "_id": "shift_id",
    "employeeId": {
      "_id": "user_id",
      "name": "John Doe",
      "employeeCode": "EMP001",
      "department": "IT"
    },
    "date": "2024-12-07",
    "startTime": "09:00",
    "endTime": "17:00",
    "createdAt": "2024-12-07T06:00:00.000Z",
    "updatedAt": "2024-12-07T06:00:00.000Z"
  }
]
```

#### POST /api/shifts
Create a new shift (Admin only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "employeeId": "user_id",
  "date": "2024-12-07",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

**Validation Rules:**
- Minimum 4 hours duration
- No overlapping shifts for the same employee
- End time must be after start time

**Response:**
```json
{
  "_id": "shift_id",
  "employeeId": "user_id",
  "date": "2024-12-07",
  "startTime": "09:00",
  "endTime": "17:00",
  "createdAt": "2024-12-07T06:00:00.000Z",
  "updatedAt": "2024-12-07T06:00:00.000Z"
}
```

#### DELETE /api/shifts/:id
Delete a shift (Admin only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "msg": "Shift removed"
}
```

### Employee Endpoints

#### GET /api/employees
Get all employees (Admin only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "employeeCode": "EMP001",
    "department": "IT",
    "createdAt": "2024-12-07T06:00:00.000Z",
    "updatedAt": "2024-12-07T06:00:00.000Z"
  }
]
```

## 🎨 Frontend Documentation

### Pages

#### Login Page (`/login`)
- Email/password authentication
- Error handling with user-friendly messages
- Auto-redirect based on user role
- Link to registration page
- Demo credentials display

#### Register Page (`/register`)
- New user registration form
- Fields: name, email, password, employee code, department
- Form validation
- Auto-login after successful registration

#### Admin Dashboard (`/admin`)
- **Shift Assignment Form**: Create new shifts
- **Filter Panel**: Filter by employee and date
- **Shift List**: View all shifts with employee details
- **Employee List**: View all registered employees
- **Delete Functionality**: Remove shifts

#### Employee Dashboard (`/dashboard`)
- **Upcoming Shifts**: Next 5 shifts highlighted
- **Weekly Calendar**: Navigate through weeks
- **Daily View**: See shifts for each day
- **All Shifts**: Complete list of assigned shifts

### Components

#### Navbar
- Displays app name with gradient
- Shows user name and role
- Logout button
- Glassmorphism design

#### ShiftCard
- Displays shift date and time
- Shows employee information (admin view)
- Calculates and displays duration
- Delete button (admin only)
- Formatted dates and times

#### ShiftForm
- Employee selection dropdown
- Date picker
- Start/end time inputs
- Form validation
- Error message display
- Success callback

#### ProtectedRoute
- Wraps protected pages
- Checks authentication status
- Role-based access control
- Auto-redirect to login if unauthorized

### Design System

**Color Palette:**
- Primary: Indigo gradient (#667eea → #764ba2)
- Secondary: Pink gradient (#f093fb → #f5576c)
- Accent: Cyan gradient (#4facfe → #00f2fe)
- Background: Dark navy (#0f172a)

**Effects:**
- Glassmorphism with backdrop blur
- Smooth transitions (150-350ms)
- Hover effects on interactive elements
- Fade-in animations

**Typography:**
- Font: Inter (Google Fonts)
- Sizes: 0.75rem to 2.25rem
- Weights: 300, 400, 500, 600, 700

## 🔧 Backend Documentation

### Database Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'user'], default: 'user'),
  employeeCode: String (required),
  department: String (required),
  timestamps: true
}
```

#### Shift Model
```javascript
{
  employeeId: ObjectId (ref: 'User', required),
  date: String (YYYY-MM-DD, required),
  startTime: String (HH:mm, required),
  endTime: String (HH:mm, required),
  timestamps: true
}
```

### Middleware

#### auth (JWT Verification)
- Verifies JWT token from Authorization header
- Attaches user info to request object
- Returns 401 if token is invalid or missing

#### authorize (Role-Based Access)
- Checks if user has required role
- Returns 403 if user doesn't have permission
- Used for admin-only routes

### Controllers

#### authController
- `login`: Authenticate user and return JWT
- `register`: Create new user account
- `seedUsers`: Create demo users (development)

#### shiftController
- `createShift`: Create new shift with validation
- `getShifts`: Get shifts (filtered by role and params)
- `deleteShift`: Remove shift by ID

## 🌍 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/employee-shift-board
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-shift-board

# JWT Secret (Change in production!)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
```

### Frontend
No environment variables required. API URL is configured in `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

## 📦 Build & Deployment

### Frontend Production Build

```bash
cd frontend
npm run build
```

Output: `frontend/dist/` directory

**Build Stats:**
- Bundle: 245 KB (79 KB gzipped)
- CSS: 6 KB (1.9 KB gzipped)
- Build time: ~7 seconds

### Backend Production

For production deployment:

1. Set `NODE_ENV=production`
2. Use a process manager (PM2, systemd)
3. Set up MongoDB Atlas or managed MongoDB
4. Use strong JWT_SECRET
5. Enable HTTPS
6. Set up proper CORS origins

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- ✅ Login with admin credentials
- ✅ Login with employee credentials
- ✅ Register new user
- ✅ Logout functionality
- ✅ Token persistence

**Admin Features:**
- ✅ Create shift
- ✅ View all shifts
- ✅ Filter by employee
- ✅ Filter by date
- ✅ Delete shift
- ✅ View employees

**Employee Features:**
- ✅ View personal shifts
- ✅ Weekly calendar navigation
- ✅ Upcoming shifts display

**Validation:**
- ✅ 4-hour minimum shift
- ✅ Overlap detection
- ✅ Form validation
- ✅ Error handling

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention (NoSQL)
- ✅ XSS protection

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for efficient employee shift management

## 🎉 Status

**✅ Production Ready** - Fully functional with all features implemented!

---

**Quick Start:**
```bash
# Terminal 1 - Backend
cd backend && npm install && npm start

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev

# Visit: http://localhost:3000
# Login: hire-me@anshumat.org / HireMe@2025!
```