const e = require('express')
const generateToken = require('../helpers/generateToken')
const User = require('../models/User')
const { registerSchema, loginSchema } = require('./authValidator')
const bcrypt = require('bcrypt')


const register = async (req, res) => {
    console.log(req.body)
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    const hashedPassword = await bcrypt.hash(value.password, 10)
    console.log(hashedPassword)
    try {
        const user = await User.create({ email: value.email, name: value.name, password: hashedPassword })
        const token = generateToken(user._id)
        return res.status(201).json({ token })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' })
        }
        console.log(error)
        return res.status(500).json({ error: "internal server Error" })
    }
}



const login = async (req, res) => {

    const { error, value } = loginSchema.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }
    try {
        const user = await User.findOne({
            email: value.email
        })
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const isPasswordValid = await bcrypt.compare(value.password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' })
        }
        const token = generateToken(user._id)
        return res.status(200).json({ token })

    } catch (error) {
            console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}






module.exports = { register, login }
