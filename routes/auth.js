const express = require('express')
const router = express.Router()
const { signUp } = require('../controllers/auth')
const { uploadImage } = require('../utils/multer')

router.post('/signup', uploadImage().single('file'), signUp)

module.exports = router
