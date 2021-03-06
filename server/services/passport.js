const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
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
        }, async (accessToken, refreshToken, profile, done) => {

            const existingUser = await User.findOne({ googleId: profile.id });

            if( existingUser ){
                existingUser.lastVisitedAt = new Date();
                const updatedUser = await existingUser.save();
                return done( null, updatedUser );
            }

            const newUser = await new User({ googleId: profile.id }).save();
            done(null, newUser);

        }
    )
);
