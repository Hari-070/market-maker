const express  = require('express');
const router = express.Router();

const { getProfile, updateProfile } = require('../controllers/profileController.js');
const { isAuthenticated } = require('../middleware/authmiddleware.js');


router.get('/getProfile', isAuthenticated, getProfile);
router.post('/updateProfile', isAuthenticated, updateProfile);

module.exports = router;

