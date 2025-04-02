const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/loginController.js');
const { isAuthenticated } = require('../middleware/authmiddleware.js');

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;

