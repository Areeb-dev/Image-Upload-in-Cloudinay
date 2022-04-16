const bcrypt = require('bcryptjs')
const { User } = require('../model')
const { cloudinary } = require('../config/cloudinary')
const fs = require("fs/promises");

const signUp = async (req, res) => {
    try {
        const { body } = req
        const filePath = req?.file?.path
        const { email, name, password } = body

        cloudinary.uploader.upload(filePath, (err, result) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            body.fileUrl = result?.url

            let addUser = new User(body)
            
            addUser.save().then(async (result) => {
                const path = email?.split("@")[0]
                await fs.rm(`./public/uploads/${path}`, { recursive: true })
                return res.send({ success: true, result })
            }).catch((err) => {
                console.log(err)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
        })
    } catch (e) {
        console.log(e)
        return res.send({ success: false, message: 'Something Went Wrong!' })
    }
}

module.exports = { signUp }