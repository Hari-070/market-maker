const express = require('express');
const router = express.Router();

const { getHomeData } = require('../controllers/homeController.js');
const { isAuthenticated } = require('../middleware/authmiddleware.js');

router.get('/getHomeData', isAuthenticated, getHomeData);

module.exports = router;
