const joi = require('joi');




const registerSchema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required(),
    
})


const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

module.exports = {
    registerSchema, loginSchema
}