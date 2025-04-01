import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRouter.js"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoute)

const PORT = process.env.PORT || 6000;
app.listen(PORT, async () =>{
    await connectDb();
    console.log(`server is run on port ${PORT}`);
})