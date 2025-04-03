import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [6, "your email must have 5 character"],
        lowerCase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationCodeValidation: {
        type: String,
        select: false,
    },
    forgotPassword: {
        type: Number,
        select: false,
    },
    forgotPasswordValidation: {
        type: String,
        select: false,
    },
}, { Timestamp: true });

const User = mongoose.model("User", userSchema);
export default User;