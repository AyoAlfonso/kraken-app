"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    access_token: {

    },
    bot_access_token: {
        type: String,
        required: true
    },
    bot_user_id: {
        type: String,
        required: true
    },
    workspaceId: {
        type: String,
        required: true
    },
    workspaceName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Workspace', workspaceSchema);
