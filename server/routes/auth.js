const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewareAuth'); 
const { register, login, changePassword } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);

router.use(authenticateJWT);
router.put('/change-password', changePassword); 

module.exports = router;
