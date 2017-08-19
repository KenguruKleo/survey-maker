const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect( keys.mongoURI, { useMongoClient: true } )
    .then( db => console.log('Successfully connect to MongoDB') )
    .catch( err => console.log('Error connecting to MongoDB: '+err) );

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 3600 * 1000,
        keys: [ keys.cookieKey ]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log('Start application on PORT='+PORT);
app.listen(PORT);