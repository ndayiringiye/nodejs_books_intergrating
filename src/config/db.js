import mongoose from "mongoose";

export const connectDb = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log("database connected successfully");
    } catch (error) {
      console.log("databse connection falied", error)
      process.exit(1);
    }
}