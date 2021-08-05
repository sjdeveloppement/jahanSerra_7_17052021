const express = require('express');
const router = express.Router();
const userCTRL = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const authentificationLimiter = require('../middleware/authentificationLimiter');// securiser le nombre de connexion contre le brut force.
const validator = require('../middleware/validator'); // sécurise le format des champs pour l'inscription et modification grace à un schema
const validatorLogin = require('../middleware/validatorLogin');

//Create a new user sign up
router.post('/register', validator, userCTRL.signup);

//login
router.post('/login', validatorLogin, authentificationLimiter, userCTRL.login);

//voir les users
router.get('/users', auth, userCTRL.findAll);

//rechercher un seul utilisateur
router.get('/users/:user_id', auth, userCTRL.findOne);

//route de modification d'un utilisateur
router.put('/users/:user_id', auth, validator, userCTRL.update); // rajout de multer, si je veux gérer la modification d'image

//route de modification Image utilisateur
router.put('/users/:user_id/avatar', auth, multer,  userCTRL.updateImg); // rajout de multer, si je veux gérer la modification d'image


//Supprimer un utilisateur ! seulement pour les admin ou le proprietaire du compte
router.delete('/users/:user_id', auth, userCTRL.delete);

module.exports = router;

