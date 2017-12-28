import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;


import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

//middlware
// parse application-json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));


//passport config

app.use(passport.initialize());
let Account = require('./models/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// API routes
app.use('/v1',routes);



//Add listener
app.server.listen(config.port);
console.log(`Listening on ${app.server.address().port}`);

export default app;
