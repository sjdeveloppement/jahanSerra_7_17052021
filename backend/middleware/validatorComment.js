const validatorComment = require('validator');
module.exports = (req, res, next)=>{
    //check si le titre est vide
    if(validatorComment.isEmpty(req.body.comment_content)){
        
        return res.status(400).json({
            error: "Le commentaire ne doit pas être vide !"
        })
    }
    // check si il y a des caractères non autorisée dans le titre
    if(!validatorComment.matches(req.body.comment_content, /^[a-zéèùâûêîôàç!?ù'\d\-_\s]+$/i)){
        
        return res.status(400).json({
            error: "Le Commentaire ne doit pas contenir des caractères spéciaux !"
        })
    }
    else{
        next();
    }
    
};