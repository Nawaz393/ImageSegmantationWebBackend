const mongoose = require('mongoose')

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    speciality:
    {
        type: String,
        default: 'Select Speciality'


    }, country: {

        type: String,
        default: 'Select Country'
    },
    profileImage: {
        type: String,
       
    }


})


module.exports = mongoose.model('User', User)