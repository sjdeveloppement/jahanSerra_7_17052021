const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];// extract token from headers authorization
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);// verify the token with .env
        const userId = decodedToken.userID; //extract user_id from token
        //console.log(decodedToken.userID);
        res.locals.userID = decodedToken.userID; // get the userid in a js object
        //console.log(res.locals.userID);
        // const user_isadmin = decodedToken.user_isadmin;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.token = token;
            req.user = userId;
            next();
        }
    } catch (error) {

        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};