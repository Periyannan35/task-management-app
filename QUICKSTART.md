# Quick Start Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017 or MongoDB Atlas connection string)

## 1. Start MongoDB

### Option A: Local MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas
Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
```

## 2. Install Dependencies (Already Done)

All dependencies are installed. To reinstall:
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

## 3. Start Development Server

```bash
npm run dev
```

This starts:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000

## 4. Use the App

### Register
1. Click "Don't have an account? Register"
2. Enter Name, Email, Password
3. Submit

### Login
1. Enter registered email and password
2. Submit

### Create Tasks
1. Fill in task title and description
2. Click "Add Task"

### Manage Tasks
- Click status buttons to change task status
- Click ✕ to delete a task

## 5. Troubleshooting

### Port already in use
```bash
# Kill process on port 5000 (backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection error
- Ensure MongoDB is running
- Check MONGODB_URI in `server/.env`
- For Atlas, whitelist your IP address

### Dependencies not installing
```bash
cd server && rm -rf node_modules package-lock.json && npm install
cd ../client && rm -rf node_modules package-lock.json && npm install
```

## 6. Project File Structure

```
Task_Management/
├── client/
│   ├── src/
│   │   ├── App.jsx              (Main app router)
│   │   ├── components/
│   │   │   ├── TaskCard.jsx     (Task display component)
│   │   │   └── TaskForm.jsx     (Task creation form)
│   │   ├── pages/
│   │   │   ├── Login.jsx        (Login page)
│   │   │   ├── Register.jsx     (Register page)
│   │   │   └── Dashboard.jsx    (Main task dashboard)
│   │   ├── services/
│   │   │   └── api.js           (Axios API client)
│   │   └── main.jsx             (React entry point)
│   ├── public/index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── User.js              (User schema with bcrypt)
│   │   └── Task.js              (Task schema)
│   ├── controllers/
│   │   ├── authController.js    (Auth logic)
│   │   └── taskController.js    (CRUD logic)
│   ├── routes/
│   │   ├── auth.js              (Auth endpoints)
│   │   └── tasks.js             (Task endpoints)
│   ├── middleware/
│   │   └── auth.js              (JWT verification & error handling)
│   ├── server.js                (Express server setup)
│   ├── .env                     (Environment variables)
│   └── package.json
│
├── package.json                 (Root for concurrently)
├── README.md
├── DEPLOYMENT.md
└── QUICKSTART.md
```

## 7. API Endpoints Reference

### Auth Endpoints
```
POST /api/auth/register
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }

POST /api/auth/logout
```

### Task Endpoints (All require JWT token)
```
GET /api/tasks
(Get all user tasks)

POST /api/tasks
Body: { title, description, status }

PUT /api/tasks/:id
Body: { title, description, status }

DELETE /api/tasks/:id
```

## 8. Environment Variables

**server/.env:**
```
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## 9. Building for Production

```bash
npm run build
```

This creates optimized client build in `client/dist/`

## 10. Next Steps

- [ ] Configure MongoDB connection
- [ ] Start dev server with `npm run dev`
- [ ] Register a user and create tasks
- [ ] Customize styles in Tailwind config
- [ ] Add more features (tags, categories, etc.)
- [ ] Deploy to Heroku/Vercel (see DEPLOYMENT.md)

---

**Happy coding! 🚀**
