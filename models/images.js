const mongoose = require("mongoose");

const images = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    mask_path: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: true
    },
    image_type: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },


})


module.exports = mongoose.model('images', images)