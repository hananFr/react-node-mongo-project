import fs from 'fs';
import Multer from 'multer';
import path from 'path';
import config from './../../config';  //configuration file to get project root path

const FILENAME = 'avatar';

const uploadDir = config.get('path_project') + '/' +'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


let photoStorage = Multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, uploadDir)
   },
   filename: function (req, file, cb) {
        cb(null, "Photo" + '_' + Date.now() + path.extname(file.originalname));
   }
})

let singleFileUpload = () => {
    return Multer({
        storage : photoStorage
    }).single(FILENAME);
}

module.exports.photoUpload = singleFileUpload;