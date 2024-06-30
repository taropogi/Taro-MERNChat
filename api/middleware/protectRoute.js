import jwt from "jsonwebtoken";
import User from "../models/user.js";
// import { configDotenv } from "dotenv";
// configDotenv();
const protectRoute = async (req, res, next) => {
  let error;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      error = new Error("Unauthorize - No token provided");
      error.statusCode = 401;
      throw error;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      error = new Error("Unauthorize - Invalid token");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decodedToken.userId).select("-password"); // we put userId when we signed the token
    if (!user) {
      error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    req.user = user;

    next(); // to proceed to the next request
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export default protectRoute;
