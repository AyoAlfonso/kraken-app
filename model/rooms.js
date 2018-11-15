"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const roomSchema = new Schema({
	roomCode: {
		type: String,
		required: true
	},
	roomName: {
		type: Number,
		required: true
	},
	roomImgUrl: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Room', roomSchema);
