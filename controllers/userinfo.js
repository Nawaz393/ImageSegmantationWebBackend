const User = require("../models/User")
const bcrypt = require('bcrypt')

const updateName = async (req, res) => {
    const { name } = req.body
    if (name.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters" })
    }
    try {
        const result = await User.findByIdAndUpdate(req._id, { fullName: name }, { new: true })
        console.log(result)
        if (!result) {
            return res.status(404).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Name updated successfully" })

    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    console.log(req.body)

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    try {

        const user = await User.findById(req._id)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const result = await User.findByIdAndUpdate(req._id, { password: hashedPassword }, { new: true })
        console.log(result)
        if (!result) {
            return res.status(404).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Password updated successfully" })

    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const userInfo = async (req, res) => {

    try {
        const user = await User.findById(req._id, { password: 0, _id: 0, __v: 0 })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        return res.status(200).json(user)

    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }

}


const uploadProfileImage = async (req, res) => {
    const file = req.file
    console.log(file)
    if (!file) {
        return res.status(400).json({ error: "Please upload an image" })
    }


    try {
        const result = await User.findByIdAndUpdate(req._id, { profileImage: file.filename }, { new: true })
        console.log(result)
        if (!result) {
            return res.status(404).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Profile image uploaded successfully" })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateProfile = async (req, res) => {
    const { name, speciality, country } = req.body

    console.log(req.body)

    try {
        const result = await
            User.findByIdAndUpdate(req._id, { name: name, speciality: speciality, country: country }, { new: true })
        console.log(result)
        if (!result) {
            return res.status(404).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Profile completed successfully" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })

    }

}



module.exports = { updateName, updatePassword, userInfo, uploadProfileImage, updateProfile }