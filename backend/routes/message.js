const express = require('express');
const router = express.Router(); // appel du routeur via express

const auth = require('../middleware/auth');// sécuriser les routes grace à l'authentification
const multer = require('../middleware/multer-config'); // gestion des images
const messageCTRL = require('../controllers/message');
const validatorMessage = require('../middleware/validatorMessage'); // valide les inputs pour la création d'un message
const isadmin = require('../middleware/admin'); // import du middleware qui vérifie si c'est un admin

//CRUD
// route all message
router.get('/', auth, messageCTRL.getAllMessage);

//post message et enregistrement des messages dans la bdd 'create'
router.post('/create',  auth, multer, validatorMessage,  messageCTRL.createMessage);

//supprimer un message 'delete' uniquement pour  l'admin 
router.delete('/:message_id', auth, isadmin.admin, messageCTRL.deleteMessage);

// Ajout de like par l'utilisateur
router.post('/:message_id/appreciation', auth, messageCTRL.likeAppreciation);

// modification des messages 'udpate' 
router.put('/:message_id', auth, multer, validatorMessage, messageCTRL.modifyMessage);


module.exports = router;