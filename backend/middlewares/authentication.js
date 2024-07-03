require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    checkAuth: async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({ error: 'No token, please login' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}