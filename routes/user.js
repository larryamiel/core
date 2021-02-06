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

// Get Live Visits of User
router.post('/live', uc.live);

// Get Data of User
router.post('/data', uc.data);

module.exports = router;