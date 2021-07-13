const sql = require('../models/db');

exports.admin =  (req, res, next) => {
    const userId = res.locals.userID; // on récupère l'id de l'utilisateur qu'on va vérifier en base pour voir si son compte est admin si c'est le cas,
    // on procède à la suppression via le controlleur
  
      sql.query("SELECT * FROM users WHERE user_id =?", userId, function (err, result){
        if (err){
            res.status(500).json(err.message);
        }
        if (result[0].user_isadmin == 1) {
            admin = true;
            return next();
          }
          else {
              console.log(result[0].user_isadmin);
            return res.status(401).json({
              message: "Autorisation refusée, seuls les admins peuvent utiliser cette route"
            });
          }
    })
  };