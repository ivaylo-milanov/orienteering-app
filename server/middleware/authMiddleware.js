const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            token = token.replace(/"/g, '');

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user no longer exists' });
            }

            next(); 
            return;

        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

const bindClubOwnership = (req, res, next) => {
    // 1. If Trainer: Force the clubId to be THEIR club
    if (req.user.role === 'trainer') {
        req.body.clubId = req.user.clubId; 
    }
    
    // 2. If User: They usually can't create events, but if they could, restrict them here
    
    // 3. If Admin: Do nothing. Let them send whatever clubId they want in req.body.
    
    next();
};

module.exports = { protect, authorize, bindClubOwnership };