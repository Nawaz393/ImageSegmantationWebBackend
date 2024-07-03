const express = require('express')
const { getImageData, getPreviousImages } = require('../controllers/handleImage')
const auth = require('../middlewares/auth')



const router = express.Router()



router.get('/getImageData', auth, getImageData)
router.get('/getPreviousImages', auth, getPreviousImages)


module.exports = router