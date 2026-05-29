# Deployment Guide

## Heroku Deployment

### 1. Setup Heroku CLI
```bash
heroku login
heroku create your-app-name
```

### 2. Create Procfile
```bash
echo "web: npm start" > Procfile
```

### 3. Set Environment Variables
```bash
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_strong_secret
heroku config:set NODE_ENV=production
```

### 4. Deploy
```bash
git push heroku main
```

---

## Vercel Deployment (Frontend Only)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy Client
```bash
cd client
vercel
```

### 3. Configure API URL
In Vercel dashboard, set environment variable:
- `VITE_API_URL=https://your-backend-api.herokuapp.com`

---

## Docker Deployment

Create Dockerfile in root:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN cd client && npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

Build & Run:
```bash
docker build -t task-management .
docker run -p 5000:5000 task-management
```

---

## MongoDB Atlas Setup

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add to `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/task-management
   ```

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS
- [ ] Set CORS properly
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Rate limit API endpoints
- [ ] Update dependencies regularly
