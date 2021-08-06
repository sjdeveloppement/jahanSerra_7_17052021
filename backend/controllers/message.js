const sql = require("../models/db");
const fs = require('fs');

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
                return res.status(500).json({ error })
            }
            console.log(message_image);
            return res.status(201).json({ message: 'Votre message  sans image a bien été posté!' })
        })
    } else {
        sql.query(`INSERT INTO message SET message_title=?, message_content=?, message_image=?, user_id=? `, [message_title, message_content, message_image, userId], function (error, results) {
            if (error) {

                return res.status(500).json({ error })
            }

            return res.status(201).json({ message: 'Votre message a bien été posté!' })
        })
    }
};
//Delete message
//on recupère l'objet dans la bdd, on extrait le nom du fichier à supp et on le supp avec fs.unlink,
// dans le callback on supp l'objet dans la base puis on renvoi la rep si cela à fonctionné ou pas.
exports.deleteMessage = (req, res, next) => {
    const message_id = req.params.message_id;
    let sqlSelectPost;
    let sqlSelectmessageUserId;
    sqlSelectPost = `SELECT message_image FROM message WHERE message_id = ? `;
    sqlSelectmessageUserId = "SELECT user_id FROM message WHERE message_id = ?";
    sql.query(sqlSelectmessageUserId, message_id, function (err, result) {
        if (err) {
            return res.status(404).json(err.message);
        }
        // condition pour que la suppression s'execute l'utilisateur doit être admin
        if (admin) {
            // ici traitement de la suppression
            sql.query(sqlSelectPost, message_id, function (err, result) {
                if (result[0].message_image != '') {
                    const filename = result[0].message_image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {// suppression de l'image du fichier avant la suppression du message
                        sqlDeletePostAdmin = "DELETE FROM message WHERE message_id = ?"; // pour l'admin
                        if (admin) {
                            sql.query(sqlDeletePostAdmin, [message_id], function (err, result) {
                                if (err) {
                                    return res.status(500).json(err.message);
                                }
                                res.status(201).json({ message: "Message supprimé par l'administrateur !" })
                            })
                        }

                    })
                }
                else {
                    sqlDeletePostAdmin = "DELETE FROM message WHERE message_id = ?"; // pour l'admin
                    if (admin) {
                        sql.query(sqlDeletePostAdmin, [message_id], function (err, result) {
                            if (err) {
                                return res.status(500).json(err.message);
                            }
                            res.status(201).json({ message: "Message supprimé par l'administrateur !" })
                        })
                    }
                }
                if (err) {
                    return res.status(500).json(err.message);
                }
            });
        } else {
            return res.status(401).json({ message: "Vous ne pouvez pas supprimer le message d'un autre utilisateur !" });
        }
    })
};

// like

exports.likeAppreciation = (req, res) => {
    // un compteur de like qui s'incrémente quand un nouvel utilisateur clique sur le bouton j'aime
    // quand l'utilisateur clique il ne peut plus re cliquer sur j'aime 

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
            })
        }
    })
};

// update message
exports.modifyMessage = (req, res, next) => {
    let user_id = res.locals.userID;
    let message_id = req.params.message_id;
    let message_image = `${req.protocol}://${req.get('host')}/images/${req.files.filename}`

    sql.query("UPDATE message SET message_title = ? , message_content = ? , message_image = ? WHERE message_id = ? AND user_id = ? ",
        [req.body.message_title, req.body.message_content, message_image, message_id, user_id], function (error, results) {
            if (error) {
                console.log(req.body);
                console.log(message_image);
                return res.status(500).json({ error });
            }
            else if (results.length === 0) {
                return res.status(404).json({ message: 'message introuvable' });
            } else {
                console.log(message_image);
                return res.status(201).json({ message: 'Message modifié ! ' });
            }
        })

};