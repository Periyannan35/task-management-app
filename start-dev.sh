#!/bin/bash

# Task Management Application - Development Server Starter

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}  Task Management Web Application${NC}"
echo -e "${BLUE}===============================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check if MongoDB is running
if ! nc -z localhost 27017 2>/dev/null; then
    echo -e "${YELLOW}⚠ MongoDB not detected on localhost:27017${NC}"
    echo -e "${YELLOW}  Please ensure MongoDB is running or update .env with MongoDB Atlas URI${NC}\n"
fi

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing root dependencies...${NC}"
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}Installing server dependencies...${NC}"
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}Installing client dependencies...${NC}"
    cd client && npm install && cd ..
fi

echo -e "${GREEN}\n✓ All dependencies installed${NC}\n"

echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}Starting Development Servers...${NC}"
echo -e "${BLUE}===============================================${NC}\n"

echo -e "${BLUE}🚀 Backend:  http://localhost:5000${NC}"
echo -e "${BLUE}🚀 Frontend: http://localhost:3000${NC}\n"

echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

npm run dev
