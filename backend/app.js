const express = require('express');
const app = express();
// body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const helmet = require('helmet'); // sécurise les entêtes http
const path = require('path'); //accès aux  chemins des fichiers
const messageRoute = require('./routes/message');
const userRoute = require('./routes/user');
const commentRoute = require('./routes/comment');

const session = require('cookie-session'); //paramètrage des cookies

require('dotenv').config();

//connexion app à la bdd

// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// sécuriser les cookies
const expiryDate = new Date(Date.now()+60*60*1000);
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

//helmet 
app.use(helmet());
// gestion image par l'app
app.use('/images', express.static(path.join(__dirname,'images')));

//routes des messages
app.use('/api/message', messageRoute);

//routes des commentaires
app.use('/api/comment', commentRoute);

//routes des users
app.use('/api/auth', userRoute);

module.exports = app;