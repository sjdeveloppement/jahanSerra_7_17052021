const express = require('express');
const router = express.Router();
const app = require('../app');
const userCTRL = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');



//Create a new user sign up
router.post('/register', userCTRL.signup);

//login
router.post('/login', userCTRL.login);

//voir les users
router.get('/users', auth, userCTRL.findAll);

//rechercher un seul utilisateur
router.get('/users/:user_id', auth, userCTRL.findOne);

//route de modification d'un utilisateur
router.put('/users/:user_id', auth, multer, userCTRL.update);


//Supprimer un utilisateur
router.delete('/users/:user_id', auth, userCTRL.delete);

module.exports = router;

