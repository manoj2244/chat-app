// server/socket/index.js
import { Server } from "socket.io";

let io;
 const userSocketMap={

 }
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: `${process.env.CLIENT_URL}`, // your frontend origin
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.handshake.query.userId)
    const userId = socket.handshake.query.userId
    userSocketMap[userId]=socket.id

    io.emit("onlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
            io.emit("onlineUsers",Object.keys(userSocketMap))

    })

    // Example custom event
    socket.on("send_message", (data) => {
      console.log("Message received:", data);
      io.emit("receive_message", data); // Broadcast to all
    });

 
  });
};
  export const getSocketId = (userId)=>{
    return userSocketMap[userId]
  }


export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
