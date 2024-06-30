import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectdb.js";

//routes
import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)

app.get("/", (req, res) => {
  res.send("This is the API Server");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log("App runningx");
});
