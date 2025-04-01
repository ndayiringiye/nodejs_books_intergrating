import Joi from "joi"; 

export const signupSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } }) 
        .min(6)
        .max(60)
        .required(),
        
    password: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$`)) 
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character (!@#$%^&*)."
        })
});
