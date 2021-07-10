const validator = require('validator');
module.exports = (req, res, next)=>{
    // check si l'email est correct
    if(!validator.isEmail(req.body.user_mail)){
        return res.status(400).json({
            error: "Email invalide, veuillez rentrer un email valide"
        })
    }
    else{
        next();
    }
};