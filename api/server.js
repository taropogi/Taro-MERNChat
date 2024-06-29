import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

//routes
import authRoutes from "./routes/auth.routes.js";

app.get("/", (req, res) => {
  res.send("This is the API Server");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("App running");
});
