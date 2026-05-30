# Task Management Web Application

A full-stack task management app built with React, Express, MongoDB, and Socket.IO.

## Features

- User authentication (Register/Login with JWT)
- Create, read, update, and delete tasks
- Task status management (pending, in-progress, completed)
- Real-time updates with Socket.IO
- Responsive mobile & desktop UI
- Protected API routes

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with bcryptjs
- **Real-time:** Socket.IO

## Project Structure

```
task-management/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── server/                # Express backend
│   ├── models/           # Mongoose models
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── server.js
│   └── package.json
└── package.json          # Root package
```

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas connection)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

2. Install root dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server && npm install && cd ..
```

4. Install client dependencies:
```bash
cd client && npm install && cd ..
```

## Environment Configuration

### Server (.env)

Create `.env` file in `/server`:
```
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## Development

Start both frontend and backend with one command:
```bash
npm run dev
```

This will run:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Building for Production

```bash
npm run build
```

## Running Production Build

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Deployment

### Deploy to Vercel/Heroku

1. Build the client:
```bash
cd client && npm run build
```

2. Configure environment variables on your hosting platform

3. Deploy:
   - **Vercel:** Connect GitHub repo
   - **Heroku:** Use Procfile and deploy

### Environment Variables for Production

Set these on your hosting platform:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A strong random secret
- `NODE_ENV=production`

## Live Deployment

The app has been deployed to Vercel for demo purposes. Note: if no MongoDB URI is configured the frontend uses a browser localStorage mock for auth and tasks.

- Production URL: https://task-management-mdzsc6x9q-periyannan35s-projects.vercel.app
- Alias: https://task-management-alpha-azure.vercel.app

To enable a real backend (persistent database and JWT auth), set the following in your Vercel project settings and redeploy:

```
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<strong_random_secret>
NODE_ENV=production
```

## License

MIT
