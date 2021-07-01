const sql = require("../models/db");
const Message = require('../models/message');
const fs = require('fs');
const connection = require("../models/db");
const { createPool } = require('mysql');
const jwt = require('jsonwebtoken');
const userSchema = require("../models/user");


// fonction pour obtenir  tous les messages Read ALL
exports.getAllMessage = (req, res, next) => {
    sql.query("SELECT message.message_id, message.message_title, message.message_content, message.message_image, message.message_appreciation, DATE_FORMAT(message.message_createdat,'%d/%m/%y') message_createdat, message.user_id, users.user_pseudo, users.user_image FROM message INNER JOIN users ON message.user_id = users.user_id ORDER BY message.message_id DESC", function (error, result) {
        if (error) {
            return res.status(500).json({ error });
        }
        //console.log(result);
        return res.status(200).json({ message: result })

    })
};
/// ici pb avec l'envoi de fichier media l'url du fichier ne s'enregistre pas dans la bdd message_image est undefined dans le body req
//envoi des messages utilisateurs CREATE
exports.createMessage = (req, res, next) => {
    // Create Message
    const message_title = req.body.message_title;
    const message_content = req.body.message_content;
    const message_image = `${req.protocol}://${req.get('host')}/images/${req.files.filename}`;
    const userId = res.locals.userID;
    sql.query(`INSERT INTO message SET message_title=?, message_content=?, message_image=?, user_id=?`, [message_title, message_content, message_image, userId], function (error, results) {
        if (error) {
            //console.log(req.file.filename);
            return res.status(400).json({ error })
        }
        console.log(req.files.filename);
        return res.status(201).json({ message: 'Votre message a bien été posté!' })
    })


};
//Delete message
//on recupère l'objet dans la bdd, on extrait le nom du fichier à supp et on le supp avec fs.unlink,
// dans le callback on supp l'objet dans la base puis on renvoi la rep si cela à fonctionné ou pas.


exports.deleteMessage = (req, res, next) => {

    /* const message_id = req.params.message_id;
     const user_id = req.currentUserId;// à finir
 
     let q = 'DELETE FROM message WHERE message_id=? AND user_id=?';
     let p = [message_id, user_id];
 
     if (req.admin) {
         q = 'DELETE FROM message WHERE message_id=?';
         p = [message_id];
 
     }
     
     if(req.body.message_image) {
         fs.unlinkSync(`images/${req.body.message_image}`);
     }
     sql.query(q, p, function (error, results) {
         if (error) {
             
             return res.status(500).json({ error });
             
         }
         console.log(user_id)
         return res.status(200).json({ message: 'message supprimé '});
         
     });*/

    sql.query('DELETE FROM message WHERE message_id = ? ', req.params.message_id, (err, rows) => {

        if (!err) {
            res.send(`message with the Record ID:${req.params.message_id} has been removed.`)
        } else {
            console.log(err)
            return res.status(404).json({ error })
        }
    })
};


//  fonctionnalités en Option pour le MVP

/*
// fonction pour obtenir un message via l'id de l'utilisateur Read one
exports.getOneMessage = (res, req, next) => {
    sql.query("SELECT message_title, user_id, message_content, message_appreciation FROM message WHERE user_id = 1", function (error, result){
        if (error) throw error;
        //console.log(result);

    })
    Message.findOne({ _id : req.params.id })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json(error));

};

// update message
exports.modifyMessage = (req, res, next) => {
    // test si il y a une image dans le message car selon le cas traitement différent.
    const messageObject = req.file ?
    // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
    {
        ...JSON.parse(req.body.message),
        message_image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Message.updateOne({ _id: req.params.id}, {...messageObject, _id:req.params.id })
    .then(()=> res.status(200).json({ message: 'Message modifié ! '})
    .catch(error => res.status(400).json({ error })));
};*/