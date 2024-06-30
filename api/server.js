import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectdb.js";
import cookieParser from "cookie-parser";
//routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // middleware to parse the cookies
app.get("/", (req, res) => {
  res.send("This is the API Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log("App runningx");
});
