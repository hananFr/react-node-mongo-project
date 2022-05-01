const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const images = require('./routes/images')
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');


mongoose.connect('mongodb://localhost/server-side', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("connected to MongoDB..."))
.catch(err => console.error('Could not connect to MongoDB'));


app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))
app.use(cors())
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use('/api/images', images);





const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));

