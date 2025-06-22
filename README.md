# MERN Chat Application

A real-time chat application built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Socket.IO** for live messaging and audio calls.

---

## Features

- Real-time messaging with Socket.IO
- User authentication and profile management
- Display online users with presence indicators
- Audio call feature using WebRTC and simple-peer
- Responsive UI built with React and Tailwind CSS
- Redux Toolkit for state management

---


---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- npm or yarn

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app


Install backend dependencies


cd server
yarn install
Install frontend dependencies


cd ../client
yarn install
Configuration
Create .env files in both server and client folders as needed:

Server (server/.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
Client (client/.env)

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
Running the Application
Start the backend server


cd server
yarn run dev
Start the frontend client


cd ../client
yarn start
