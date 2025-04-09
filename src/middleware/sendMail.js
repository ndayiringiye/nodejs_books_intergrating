import nodemailer from "nodemailer";

export const tronsport = nodemailer.createTransport({
    email: "gmail",
    auth:{
        user:process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env
    }
}) 