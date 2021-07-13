const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const sql = require('../models/db');
//const Users = require('../models/users');
const User = require('../models/user');
const userSchema = require('../models/user');

//const { Model } = require('sequelize/types');

// Création d'un schema de validation du mot de passe afin de sécuriser les comptes avec un mdp fort
const passwordValidator = require('password-validator');
const { response } = require('../app');
const multer = require('multer');
const schema = new passwordValidator();
schema
    .is().min(8) // min 8 caractères
    .has().digits(1) // min 1 chiffre
    .has().uppercase(1) // min 1 caractère majuscule
    .has().lowercase(1) // min 1 caractère minuscule
    .has().symbols(1) // min 1 symbole
    .has().not().spaces(); // ne doit pas contenir d'espace


//  signup : on regarde si le schema du mdp est respecté si ok -> cryptage du password, créer l'utilisateur avec le mdp crypté le pseudo et le mail, puis l'enregistre dans la bdd
exports.signup = (req, res, next) => {
    //validation de la requete
    if (!schema.validate(req.body.user_password)) {
        res.status(401).json({
            message: "Mot de passe incomplet, il faut minimum 8 caractères, 1 chiffre, 1 symbole, une majuscule et une minuscule et sans espace "
        });
        return false;
    }

    // cryptage du mdp avec bcrypt

    bcrypt.hash(req.body.user_password, 10) //appelle la fonction de hachage et "sale" le mdp 10 fois
        .then(hash => {
            const newUser = new User({ //crée l'utilisateur
                user_pseudo: req.body.user_pseudo,//'','okok'
                user_mail: req.body.user_mail,//'.com','mail@test.com'
                user_password: hash,//'''test'
                user_image: 'image_user.default.png',
                user_isadmin: false
            });
            // Insert user in DB
            sql.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
                if (error) {
                    console.log(newUser);
                    return res.status(500).json({ error });

                }

                // DB ok
                const id = results.insertId;
                newUser.id = id;
                
                console.log('utilisateur crée:', newUser);
                return res.status(200).json({
                    message: 'utilisateur créé',
                    user: newUser
                });

            });
        })

}

// fonction login : recupère l'utilisateur dans la base on regarde si il existe et on compare les identitifiants,  on regarde le hash dans la bdd si c'est bon on lui renvoi un token
exports.login = (req, res, next) => {
    const email = req.body.user_mail;
    const password = req.body.user_password;

    const sqlFindUser = "SELECT user_id, user_password FROM users WHERE user_mail = ?";
    //recherche de l'utilisateur dans la bdd
    sql.query(sqlFindUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        

        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        //si l'utilisateur existe, vérification du mot de passe
        
        else {
            bcrypt.compare(password, result[0].user_password)
               
                .then(valid => {
                    //si le mot de passe est incorrect
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        token: jwt.sign(
                            { userID: result[0].user_id },
                            process.env.JWT_SECRET_TOKEN,
                            { expiresIn: "24h" }
                        )

                    });

                    
                })
                .catch(e => res.status(500).json(e));
        }

    });
};



//get users read all
exports.findAll = (req, res, next) => {
    sql.query('SELECT user_pseudo, user_mail, user_image, user_isadmin FROM users', function (err, result) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(result);
                if (err) throw err;
                console.log('requete envoyée');
            }, 1000);
        })

            .then(res.status(200).json(result))
            .catch(error => { res.status(400).json({ error }) })
    })
};


// get one user 
exports.findOne = (req, res, next) => {
    User.findById(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Utilisateur introuvable avec cet id ${req.params.user_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Erreur lors de la récupération de l'utilisateur avec l'identifiant " + req.params.user_id
                });
            }
        } else res.send(data);
    });

};

//update user
exports.update = (req, res, next) => {
    
    const imgUser = req.file ?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null ;
    const modifyCryptedPass = req.body.user_password;
        bcrypt.hash(modifyCryptedPass, 10)
            .then(hash => {
              
                sql.query('UPDATE users SET user_pseudo=?, user_mail=?, user_password=?, user_image=?  WHERE user_id=?', [req.body.user_pseudo, req.body.user_mail, hash, imgUser, req.params.user_id], function (error, results) {
                    if (error) {
                        console.log(req.body);
                        return res.status(500).json({ error });
                    } else if (results.length === 0) {
                        return res.status(401).json({ message: 'utilisateur inexistant' });
                    } else {
                        console.log(imgUser)
                        return res.status(200).json({ message: 'utilisateur modifié' });

                    }
                });

            })
    
};

//Delete user on séléctionne l'id qui correspond dans la bdd à l'id séléctionner dans les paramètre de la req http et on verifie sa présence si ok suppression
exports.delete = (req, res, next) => {
    const user_id = req.params.user_id;
    const userId = res.locals.userID;
    sql.query("SELECT user_isadmin FROM users WHERE user_id=?", userId, function(err, result){
        if (err){
            res.status(500).json(err.message);
        }
        if (result[0].user_isadmin == 1 ||user_id == userId){
            sql.query('DELETE FROM users WHERE user_id=?', user_id, function (error, results) {
                if (error) {
                    return res.status(500).json({ error });
                } else if (results.length === 0) {
                    return res.status(401).json({ message: 'utilisateur introuvable' });
                } else {
                    return res.status(200).json({ user: results[0], message: 'profil supprimé' });
                }
            });
        }else{
            return res.status(403).json({ message: "Vous ne pouvez pas supprimer le profil d'un autre utilisateur"});
        }
        }
    )
    
};

