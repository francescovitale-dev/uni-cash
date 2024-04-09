const express = require('express');
const router = express.Router();
// const authenticateJWT = require('../middlewareAuth'); // Importa il middleware di autenticazione JWT
const { register, login, changePassword } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);

// router.use(authenticateJWT);
router.put('/change-password', changePassword); // New route for changing password

module.exports = router;
