const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

const autenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(401).json({ message: 'Access denied. Admin token required.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateUser, autenticateAdmin;
