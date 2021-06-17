const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//creation de la connection à la bdd
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

//message de connexion
connection.connect(error =>{
    if(error) throw error;
    console.log('Connexion à la bdd avec succès.');
});

module.exports = connection;