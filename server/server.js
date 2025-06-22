import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.route.js"
import connectDB from "./db/connection.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { initSocket } from "./socket/socket.js"; 
import http from "http"


const app = express();
dotenv.config();

const server = http.createServer(app); // create server manually for socket.io

initSocket(server); // initialize socket on that server



// Middleware
app.use(express.json());

app.use(cors({
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,              
}));

app.use(cookieParser());


const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();
// routers

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message/", messageRoutes);


// Main Entry Point

app.get("/", (req, res) => {
  res.send("Api is Runing");
});

app.use(globalErrorHandler);

// Server Listennig

server.listen(PORT, () => {
  console.log("server is running");
});
