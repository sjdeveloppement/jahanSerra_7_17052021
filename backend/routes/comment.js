const express = require('express');
const router = express.Router(); // appel du routeur via express

const auth = require('../middleware/auth');// sécuriser les routes grace à l'authentification
const commentCTRL = require('../controllers/comment');

const validatorComment = require('../middleware/validatorComment'); // vérifie si le commentaire n'est pas vide et si il n'y a pas de script.
const isadmin = require('../middleware/admin'); // import du middleware qui vérifie si c'est un admin

//CRUD
// route all comment
router.get('/all', auth, commentCTRL.getAllComment);

//post comment et enregistrement des commentaire dans la bdd 'create'
router.post('/create/:message_id', auth, validatorComment, commentCTRL.createComment);

//supprimer un comment 'delete' uniquement pour le modérateur ici le . admin permet d'acceder au middleware précis
router.delete('/:comment_id', auth, isadmin.admin, commentCTRL.deleteComment);


module.exports = router;