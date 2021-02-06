const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;