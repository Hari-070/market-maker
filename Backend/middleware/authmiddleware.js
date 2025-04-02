const jwt = require('jsonwebtoken');
const User = require('../models/userModels.js');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(403).json({ message: 'Access Denied: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
