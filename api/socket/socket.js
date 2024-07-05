import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  //   console.log("A user connected!", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  // send event to ll connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // listening to typing event from frontend
  socket.on("typing", (data) => {
    const receiverSocketId = getReceiverSocketId(data.receiverId);
    if (receiverSocketId) {
      // use to send event to specific client
      io.to(receiverSocketId).emit("typing", {
        receiverId: data.receiverId,
        senderId: data.senderId,
      });
    }
  });
  // socket.on is used to listen to the events.
  // Can be used both on client and server side
  socket.on("disconnect", () => {
    // console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
