const jwt = require('jsonwebtoken');

module.exports = (req, res ,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        console.log(decodedToken.userId);
        if (req.body.user_id && req.body.user_id !== userId ){
            throw 'User ID non valable !';
        } else {
            next();
            
        }
    } catch (error) {
        
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};