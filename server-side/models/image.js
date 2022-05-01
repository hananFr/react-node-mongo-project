const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('@hapi/joi');


const cardSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    
});

function validateImage(img) {

    const schema = Joi.object({
      image: Joi.required(),
  
    });
    return schema.validate(img)
}
const Image = mongoose.model('Image', cardSchema);

exports.Image = Image;
exports.validateImage = validateImage;