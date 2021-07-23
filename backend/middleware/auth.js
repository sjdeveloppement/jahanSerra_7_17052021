const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];// extract token from headers authorization
        //console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);// verify the token with .env
        //console.log(decodedToken)
        const userId = decodedToken.userID; //extract user_id from token
        //console.log(userId);
        res.locals.userID = decodedToken.userID; // get the userid in a js object
        //console.log(res.locals.userID);
        // const user_isadmin = decodedToken.user_isadmin;
        //console.log(decodedToken);
        //console.log(userId);
        //console.log(token);
        
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