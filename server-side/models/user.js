const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date, default: Date.now},
    cards: Array
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, admin: this.admin}, config.get('jwtKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(1024).regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[#!*@$%^&()\-_]+)[A-Za-z\d#!*@$%^&()]{8,20}$/).required(),
        admin: Joi.boolean().required()
    })
    

    return schema.validate(user)
}

function validateCards(data){
    const schema = Joi.object({
        cards: Joi.array().min(1).required()
    });

    return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
exports.validateCards = validateCards;