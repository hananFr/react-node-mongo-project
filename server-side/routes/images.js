const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {Image, validateImage} = require('../models/image');
const { toArray } = require('lodash');


const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: fileFilter
}).single('image')


router.get('/get', async (req,res) => {
    const images = await Image.find(req.body.id)
    const pictures = toArray(images)
    console.log(images)
    res.send(pictures)
})


router.get("/:id", async (req, res) =>{
    console.log(req.params.id);
    let image = await Image.findById(req.params.id)
    let url = image.image

    
    fs.readFile(url, function(err, data) {
        console.log(url);
        if (err) throw err; // Fail if the file can't be read.
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          console.log(data);
          res.end(data); // Send the file data to the browser.
      });
})

router.post('/uploads', auth, upload , async (req, res) => {    
    console.log(req.body.image);
    console.log(req.file);
    const file = path.join(__dirname, `../${req.file.path}`)

    
    
    let image = new Image ({
        image: file,
        num: req.body.num
    });
    console.log(image);
post = await image.save();
res.send(post)
})

module.exports = router;