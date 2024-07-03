
const images = require('../models/Images')
const User = require('../models/User')

const getImageData = async (req, res) => {
    const { id } = req.query

    try {

        const image = await images.findOne({ _id: id })
        console.log(image)
        if (!image) {
            return res.status(404).json({ error: "Image not found" })
        }
        return res.status(200).json(image)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }

}


const getPreviousImages = async (req, res) => {


    try {

        const imagesRes = await images.find({ user_id: req._id})
        console.log(imagesRes)
        if (!imagesRes) {
            return res.status(404).json({ error: "Images not found" })
        }
        return res.status(200).json(imagesRes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })

    }

}

module.exports = { getImageData, getPreviousImages }