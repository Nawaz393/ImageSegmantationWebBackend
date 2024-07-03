const express = require('express')
const auth = require('../middlewares/auth')
const { updateName,updatePassword, userInfo, uploadProfileImage, updateProfile } = require('../controllers/userinfo')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({
    storage: storage,
})


const router = express.Router()
router.post('/updateName',auth,updateName)
router.post('/updatePassword',auth,updatePassword)
router.get('/userInfo',auth,userInfo)
router.post("/updateprofile",auth,updateProfile)
router.post('/uploadProfileImage',auth,upload.single('profileImage'),uploadProfileImage)

module.exports = router