const validator = require('validator');
module.exports = (req, res, next)=>{
    // check si l'email est correct
    if(!validator.isEmail(req.body.user_mail)){
        return res.status(400).json({
            error: "Email invalide, veuillez rentrer un email valide"
        })
    }
    // check si le pseudo est vide
    if (validator.isEmpty(req.body.user_pseudo)){
        return res.status(400).json({
            error: "Le champs du pseudo est vide"
        })
    }
    //check si il y a des caractère spéciaux dans l'email
    if(validator.matches(req.body.user_mail, /^[/$<>*/|\s]+$/i)){
        
        return res.status(400).json({
            error: "L'email ne doit pas contenir des caractères spéciaux"
        })
    }
    // check si le pseudo n'a pas de caractères non autorisés
    if(!validator.matches(req.body.user_pseudo,  /^[a-zéèùâûêîôàù'\d\-_\s]+$/i)){
        
        return res.status(400).json({
            error: "Le pseudo ne doit pas contenir des caractères spéciaux"
        })
    }
    // check si le pseudo n'a pas moins de 2 caractères
    if(!validator.isLength(req.body.user_pseudo,  {min:2, max: 255})){
        
        return res.status(400).json({
            error: "Le pseudo ne doit pas être plus petit que 2 caractères"
        })
    }
    else{
        next();
    }
};