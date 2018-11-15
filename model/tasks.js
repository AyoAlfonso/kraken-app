"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const taskSchema = new Schema({
    project: {
        type: String,
    },
    owner: {
        type: String,
    },
    taskBody: {
        type: String,
    },
    assingee: {
        type: String
        //Waiting on @elijah, @Chidinma
    },
    startDate: {
        //3 days old
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
        //Tasks that missed target
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Task', taskSchema);
