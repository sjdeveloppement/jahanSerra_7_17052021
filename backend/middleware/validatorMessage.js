const validatorMessage = require('validator');
module.exports = (req, res, next)=>{
    //check si le titre est vide
    if(validatorMessage.isEmpty(req.body.message_title)){
        
        return res.status(400).json({
            error: "Le titre du message ne doit pas être vide"
        })
    }
    // check si il y a des caractères non autorisée dans le titre
    if(!validatorMessage.matches(req.body.message_title, [/^[a-zéèùâûêîôàù'\d\-_\s]+$/i])){
        
        return res.status(400).json({
            error: "Le titre du message ne doit pas contenir des caractères spéciaux"
        })
    }
    //check si le contenu est vide
    if(validatorMessage.isEmpty(req.body.message_content)){
        
        return res.status(400).json({
            error: "Le contenu du message ne doit pas être vide"
        })
    }
    //check si le contenu contient des caractères spéciaux
    if(!validatorMessage.matches(req.body.message_content, [/^[a-zéèùâûêîôàù'\d\-_\s]+$/i])){
        
        return res.status(400).json({
            error: "Le contenu du message ne doit pas contenir  des caractères spéciaux"
        })
    }
    else{
        next();
    }
    
};