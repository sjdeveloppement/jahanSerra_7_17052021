const express = require('express');
const router = express.Router(); // appel du routeur via express

const auth = require('../middleware/auth');// sécuriser les routes grace à l'authentification
const multer = require('../middleware/multer-config'); // gestion des images
const messageCTRL = require('../controllers/message');

//CRUD
// route all message
router.get('/', auth, messageCTRL.getAllMessage);

//post message et enregistrement des messages dans la bdd 'create'
router.post('/create', auth, multer, messageCTRL.createMessage);

//supprimer un message 'delete' uniquement pour le modérateur
router.delete('/:message_id', auth, messageCTRL.deleteMessage);

// Ajout de like par l'utilisateur
router.post('/:message_id/appreciation', auth, messageCTRL.likeAppreciation);

/* Amélioration des routes possible en option pour le MVP
//récuperer le message par l'id 'read' pour voir un seul message
router.get('/:id', auth, messageCTRL.getOneMessage);

// modification des messages 'udpate' 
router.put('/:id', auth, multer, messageCTRL.modifyMessage);*/

module.exports = router;