const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided' })
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach decoded user info to request
        next();
    });
}

module.exports = {verifyToken}