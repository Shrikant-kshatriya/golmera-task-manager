const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { checkValidLogin, checkValidRegistration } = require('../middlewares/validator');

router
.post('/register', checkValidRegistration, registerUser)
.post('/login', checkValidLogin, loginUser)
.post('/logout', logoutUser);

module.exports = router;