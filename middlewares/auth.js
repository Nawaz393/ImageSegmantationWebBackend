const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {

    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const token = authHeader.split(' ')[1]
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        result = await User.findById(decoded.userId)
        req._id = result._id
        if (!result) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Unauthorized" })
    }
}


module.exports = auth