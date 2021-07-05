const sql = require('./db');

//constructeur
const userSchema = function(user) {
    this.user_pseudo = user.user_pseudo;
    this.user_mail = user.user_mail;
    this.user_password = user.user_password;
    this.user_image = user.user_image;
    this.user_isadmin = user.user_isadmin;
    
};

//rechercher l'utilisateur par l'id
userSchema.findById = (user_id, result)=>{
    sql.query(`SELECT * FROM users WHERE user_id = ${user_id} `,(err, res)=>{ //${user_id}
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("utilisateur trouvé: ", res[0]);
            result(null, res[0]);
            return;
        }
        //utilisateur introuvable 
        result({ kind: "not_found" }, null);
    })
};

//Selectionner tout les users

userSchema.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) =>{
        if (err) {
            console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("utilisateurs: ", res);
        result(null, res);
        
    });
};

module.exports = userSchema;
