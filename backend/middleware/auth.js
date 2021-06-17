const jwt = require('jsonwebtoken');

module.exports = (req, res ,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];// extract token from headers authorization
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);// verify the token with .env
        const userId = decodedToken.userId; //extract user_id from token
        console.log(decodedToken.userId);
       // const user_isadmin = decodedToken.user_isadmin;
        if (userId){
            next();
        } else {
            throw 'User ID non valable !';
            
        }
    } catch (error) {
        
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};