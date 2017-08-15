const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastVisitedAt: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('users', userSchema);