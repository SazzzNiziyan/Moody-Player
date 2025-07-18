const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service')
const router = express.Router();
const songModel = require("../models/song.model")

const upload = multer({storage:multer.memoryStorage()});


router.post('/song',upload.single("audio"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file);
    
    
    const song = await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        audio:fileData.url,
        mood: req.body.mood
    })


    res.status(201).json({
        message: 'Song created Successfully',
        song: song
    })
})

router.get('/song',async(req,res)=>{
    const {mood} = req.query;

    const song =await songModel.find({
        mood: mood
    })

    res.status(200).json({
        message:"Songs fetch successfully",
        song
    })
})

module.exports = router;