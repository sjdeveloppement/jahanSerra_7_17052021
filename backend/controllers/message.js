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
// ici pb avec l'envoi de fichier media l'url du fichier ne s'enregistre pas correctement dans la bdd message_image est undefined 
//dans le body req du coup le nom du fichier n'est pas recuperer pour l'url

// messages utilisateurs CREATE
exports.createMessage = (req, res, next) => {
    // Create Message
    const message_title = req.body.message_title;
    const message_content = req.body.message_content;
    const userId = res.locals.userID;

    const message_image = `${req.protocol}://${req.get('host')}/images/${req.files.filename}`;


    // pour sans image
    if (req.files.filename == null) {
        sql.query(`INSERT INTO message SET message_title=?,  message_content=?, user_id=?  `, [message_title, message_content, userId], function (error, results) {
            if (error) {
                //console.log(req.file.filename);
                return res.status(402).json({ error })
            }
            console.log(message_image);
            return res.status(201).json({ message: 'Votre message  sans image a bien été posté!' })
        })
    } else {
        sql.query(`INSERT INTO message SET message_title=?, message_content=?, message_image=?, user_id=? `, [message_title, message_content, message_image, userId], function (error, results) {
            if (error) {

                return res.status(400).json({ error })
            }

            return res.status(201).json({ message: 'Votre message a bien été posté!' })
        })
    }
    ////


};
//Delete message
//on recupère l'objet dans la bdd, on extrait le nom du fichier à supp et on le supp avec fs.unlink,
// dans le callback on supp l'objet dans la base puis on renvoi la rep si cela à fonctionné ou pas.

// à trouver le moyen de ne pas afficher le message supprimé quand l'id de l'utilisateur est diff de l'id de l'id du createur du message.
// je dois comparer l'id de l'utilisateur avec l'id de l'utilisateur qui a crée le message si c'est bon j'autorise la suppression de l'image puis du message
// s'occuper aussi du cas de l'admin.
exports.deleteMessage = (req, res, next) => {

    const userId = res.locals.userID;
    const message_id = req.params.message_id;

    let sqlDeletePost;
    let sqlSelectPost;
    let sqlSelectmessageUserId;

    sqlSelectPost = `SELECT message_image FROM message WHERE message_id = ? `;
    sqlSelectmessageUserId = "SELECT user_id FROM message WHERE message_id = ?";
    // ici faire une condition avec elsif plutôt pour gerer le cas ou l'utilisateur n'a pas le même id que l'user_id du message

    sql.query(sqlSelectPost, message_id, function (err, result) {

        //console.log(result[0].message_image);
        if (result[0].message_image != '') {
            const filename = result[0].message_image.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {// suppression de l'image du fichier avant la suppression du message
                sqlDeletePost = "DELETE FROM message WHERE user_id = ? AND message_id = ?";
                sql.query(sqlDeletePost, [userId, message_id], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    
                    res.status(200).json({ message: "Message  supprimé !" })
                })
            })

        }
        else {
            sqlDeletePost = "DELETE FROM message WHERE user_id = ? AND message_id = ?";
            sql.query(sqlDeletePost, [userId, message_id], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                console.log(result);
                res.status(200).json({ message: "message supprimé !" });
            });
        }
        if (err) {
            return res.status(500).json(err.message);
        }
    });
};

// like et dislike // A finir !

exports.likeAppreciation = (req, res) => {
    // un compteur de like qui s'incrémente quand un nouvel utilisateur clique sur le bouton j'aime
    // quand l'utilisateur clique il ne peut plus re cliquer sur j'aime 
    let appreciation = req.body.appreciation;
    const userId = res.locals.userID;

    // on recupère l'id du message
    let message_id = req.params.message_id;
    //sql message like
    let sqlMessageAppreciationCounter;
    let values;

    // verification si l'utilisateur à déjà like
    let CheckAlreadyLiked = "SELECT appreciation_id FROM appreciation WHERE message_id = ? AND user_id = ?";
    values = [message_id, userId];
    sql.query(CheckAlreadyLiked, values, function (err, result) {
        if (err) {
            return res.status(500).json(err.message)
        }
        // si un appreciation_id est trouvé alors on bloque, sinon on ajoute le like de l'utilisateur au message dans la table appreciation.
        if (result[0] !== undefined) {
            return res.status(401).json({ message: "un like par personne seulement" })
        }
        else {
            // insertion des données pour le like dans la table appreciation
            sqlMessageAppreciationCounter = 'INSERT INTO appreciation VALUES (NULL, ?, ?, NOW())';
            values = [message_id, userId];
            sql.query(sqlMessageAppreciationCounter, values, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(201).json({ message: "Like ajouté" });
            })
            // on incremente le compteur 

            sqlInsertCount = "UPDATE message SET message_appreciation = message_appreciation +1 WHERE message_id = ? ";
            sql.query(sqlInsertCount, message_id, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                //return res.status(200).json({message: "like ajouté sur le message"+ message_id + "!"});
            })
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
        message_image: `${req.protocol}://${req.get('host')}/images/${req.files.filename}`
    } : { ...req.body };
    Message.updateOne({ _id: req.params.id}, {...messageObject, _id:req.params.id })
    .then(()=> res.status(200).json({ message: 'Message modifié ! '})
    .catch(error => res.status(400).json({ error })));
};*/