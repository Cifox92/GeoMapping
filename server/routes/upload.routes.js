const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudUploader = require('../configs/cloudinary.config')


router.post('/upload', cloudUploader.single('photo'), (req, res, next) => {
    res.json({ secure_url: req.file.path })
        .catch(err => next(new Error(err)))
})

module.exports = router