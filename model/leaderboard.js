
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    tasks: {
        type: String,
        required: true
    },
    peerCodings: {
        type: String,
        required: true
    },
    userType: {
        //Leaderboard based on user type
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
