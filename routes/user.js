const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const uc = new UserController();

// Get User
router.post('/', uc.index);

// Register User
router.post('/register', uc.register);

// Login User
router.post('/login', uc.login);

// Logout User
router.post('/logout', uc.logout);

module.exports = router;