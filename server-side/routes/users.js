const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateCards } = require('../models/user');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { Card } = require('../models/card');
const { token } = require('morgan');
const router = express.Router();

const getCards = async (cardsArray) => {
    const cards = await Card.find({ 'travelNumber': { $in: cardsArray } });
    return cards;
};

router.get('/cards', auth, async (req, res) => {
    if (!req.query.numbers) res.status(400).send('Missing numbers data');

    let data = {};
    data.cards = req.query.numbers.split(',');

    const cards = await getCards(data.cards);
    res.send(cards);
})

router.put('/admin/:id',adminAuth, async (req, res) => {

    
    let user = await User.findById(req.params.id)
    

    const updateUser = await User.findOneAndUpdate({_id: req.params.id}, {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        admin: req.body.admin,
        
    })
    
    
    res.send(updateUser)
})

router.patch('/cards', auth, async (req, res) => {
    const { error } = validateCards(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const cards = await getCards(req.body.cards);
    if (cards.length != req.body.cards.length) res.status(400).send('.לא שמרת סיורים במועדפים');
    let user = await User.findById(req.user._id);
    user.cards = req.body.cards;
    user = await user.save();
    res.send(user);
})

router.get('/me',adminAuth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.get('/get', async (req, res, next) => {

    const members = []
    let users = await User.find(req.params.id);
    users.map(member => {

        const user = {
            name: member.name,
            email: member.email,
            createdAt: member.createdAt,
            admin: member.admin,
            id: member._id
        }
        members.push(user)
    });
    res.send(members)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('.האימייל הזה בשימוש');
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'admin', 'travel']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()
    res.send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router