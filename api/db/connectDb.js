import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    console.log("connected");
  } catch (error) {
    console.log("Error connecting to db");
  }
};

export default connectDb;
