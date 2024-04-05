const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.put('/change-password', changePassword); // New route for changing password

module.exports = router;
