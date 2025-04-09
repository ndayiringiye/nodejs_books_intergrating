import express from "express";
import { signup, signin } from "../controllers/userController.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signin);



export default router;