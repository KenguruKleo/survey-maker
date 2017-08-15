const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../../keys');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID || process.env.GOOGLE_CLIENT_ID,
            clientSecret: keys.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            new User({ googleId: profile.id }).save();
        }
    )
);
