import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;
app.listen(PORT, async () =>{
    await connectDb();
    console.log(`server is run on port ${PORT}`);
})