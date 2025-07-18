const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service')


const router = express.Router();

const upload = multer({storage:multer.memoryStorage()});


router.post('/song',upload.single("audio"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file);
    console.log(fileData)
    res.status(201).json({
        message: 'Song created Successfully',
        song: req.body
    })
})

module.exports = router;