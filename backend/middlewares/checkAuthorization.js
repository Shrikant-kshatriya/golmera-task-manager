module.exports = {
    checkAuthorization: async (req, res, next) => {
        if(req.user.role === 'admin') {
            return next();
        }
        res.status(401).json({ message: 'Unauthorized' });
    }
}