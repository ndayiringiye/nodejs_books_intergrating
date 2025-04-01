import bcrypt from "bcryptjs";
import { signupSchema } from "../middleware/validator.js";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = signupSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword });
        const result = await newUser.save();

        const userWithoutPassword = result.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({ success: true, message: "User account created successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
