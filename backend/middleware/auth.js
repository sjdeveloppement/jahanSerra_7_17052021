const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];// extract token from headers authorization
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);// verify the token with .env
        
        const userId = decodedToken.userID; //extract user_id from token
        
        res.locals.userID = decodedToken.userID; // get the userid in a js object
        
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            console.log('token authentifié')
            next();
        }
    } catch (error) {
        
        res.status(401).json({ error: error && 'Requête non authentifiée !' });
    }
};