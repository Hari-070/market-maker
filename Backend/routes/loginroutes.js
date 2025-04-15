const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/loginController.js');
const { isAuthenticated } = require('../middleware/authmiddleware.js');

router.post('/login', login);
router.post('/register', register);

module.exports = router;

