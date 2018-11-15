"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const pullRequestSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    pullRequestAddress: {
        type: String,
    },
    pullRequestComment: {
        type: String,
    },
    contributors: [
        {
            type: String,
            required: true
        }
    ],
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: 0
    },
    target: {
        //Pull Requests that missed target
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('PullRequest', pullRequestSchema);
