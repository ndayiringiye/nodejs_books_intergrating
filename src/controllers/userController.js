import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../middleware/validator.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const {username, email, password } = req.body;

    try {
        const { error } = signupSchema.validate({username, email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({username, email, password: hashedPassword });
        const result = await newUser.save();

        const userWithoutPassword = result.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({ success: true, message: "User account created successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error:error.message });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const value = await signinSchema.validateAsync({ email, password });

        const existUser = await User.findOne({ email }).select("+password");
        if (!existUser)
            return res.status(404).json({ success: false, message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign(
            {
                userId: existUser._id,
                email: existUser.email,
                verified: existUser.verified
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("Authorization", "Bearer " + token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        res.json({
            success: true,
            token,
            message: "Logged in successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const loggnout = (req ,res) =>{
    res.clearCookie("Authorization").status(200).json({success: true, message :"lognout in successfully"})

} 