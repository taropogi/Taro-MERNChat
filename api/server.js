import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectdb.js";
import cookieParser from "cookie-parser";
//routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // return root directory (for deployment)

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // middleware to parse the cookies
// app.get("/", (req, res) => {
//   res.send("This is the API Server");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//for deployment
app.use(express.static(path.join(__dirname, "client", "dist"))); // Serve dist folder as static/ after build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDb();
  console.log("App runningx");
});
