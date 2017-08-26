const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    credits: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastVisitedAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', userSchema);