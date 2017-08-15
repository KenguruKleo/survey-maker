const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../../keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    console.log('user.id', user.id);
    done( null, user.id );
});

passport.deserializeUser( (id, done) => {
    User.findById( id ).then( user => {
        done( null, user)
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID || process.env.GOOGLE_CLIENT_ID,
            clientSecret: keys.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then( (existingUser) => {
                    if( existingUser ){

                        done( null, existingUser );
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then( newUser => done(null, newUser) );
                    }
                });
        }
    )
);
