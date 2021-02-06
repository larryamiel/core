const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Initialize Express App
const app = express();

/* ------------ Middlewares ------------- */

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Cookies
app.use(cookieParser('secret'));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

/* ------------ Middlewares ------------- */

// Passport Configuration
require('./config/passport')(passport);

// Routes
app.use('/user', require('./routes/user.js'));

// Start Express (Listen on Port 5000)
app.listen(5000, () => {
    console.log('Server is running on port: 5000 ; http://localhost:5000');
});