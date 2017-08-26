const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
const MONGO_URI = keys.mongoURI || process.env.PORT;
mongoose.connect( MONGO_URI, { useMongoClient: true } )
    .then( db => console.log('Successfully connect to MongoDB') )
    .catch( err => console.log('Error connecting to MongoDB: '+err) );

const app = express();

app.use( bodyParser.json() );

const COOKIE_KEY = keys.cookieKey || process.env.COOKIE_KEY;
app.use(
    cookieSession({
        maxAge: 30 * 24 * 3600 * 1000,
        keys: [ COOKIE_KEY ]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log('Start application on PORT='+PORT);
app.listen(PORT);