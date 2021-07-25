const sql = require("../models/db");
const Comment = require("../models/comment");

//fonctions
// get all comment
exports.getAllComment = (req, res)=>{
    const message_id = req.params.message_id;
    sql.query('SELECT * FROM `comment` JOIN message WHERE message.message_id = comment.message_id  ORDER BY comment.comment_id DESC',  function (error, result){
        if (error){
            return res.status(500).json({ error });
        }
        return res.status(200).json({message: result})
    })
};

//create comment
exports.createComment = (req, res)=>{
    let newComment = new Comment(req.body);
    newComment.user_id = res.locals.userID;
    newComment.message_id = req.params.message_id;
    newComment.comment_content = req.body.comment_content;
    sql.query('INSERT INTO comment SET ?', newComment, function (error, results){
        if(error){
            
            return res.status(500).json({ error });
        }
        //DBok
        const id = results.InsertId;
        newComment.comment_id = id;
        return res.status(200).json({
            message: 'commentaire ajouté',
            comment: newComment
        })
    })
};

//DELETE comment
exports.deleteComment = (req, res)=>{
    const comment_id = parseInt(req.params.comment_id);
    
    
    const user_id = res.locals.userID;
   
    let q = 'DELETE FROM comment WHERE comment_id=? AND user_id=?';
    let p =[comment_id, user_id];
    // en cas de suppression par l'admin
    if(admin){
        q='DELETE FROM comment WHERE comment_id=?';
        p=[comment_id];
        sql.query(q,p,function (error, results){
            if(error){ 
                return res.status(500).json({ error });
            }
            
            else{
                
                return res.status(200).json({message: 'Commentaire supprimé'});
            }
            
        })
    }
    // en option pour après le mvp rajout de la possibilité par l'utilisateur de supprimer son propre commentaire
    /*if(!admin){
        // en cas de suppression par l'utilisateur
    sql.query(q,p,function (error, results){
        if(error){ 
            return res.status(500).json({ error });
        }
        
        else{
            
            return res.status(200).json({message: "Si vous êtes l'auteur du commentaire, il sera supprimé"});
        }
        
    })
    }*/
};