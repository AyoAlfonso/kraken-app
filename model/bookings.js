"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const bookingSchema = new Schema({
	owner: {
		type: String,
	},
	roomCode: {
		type: String,
	},
	period: {
		type: String,
		//9:00am - 10:00 am, 10:00am - 11:00 am, 11:00am - 12:00 pm, 12:00pm - 1:00 pm, 1:00pm - 2:00 pm, 2:00pm - 3:00 pm, 
		//3:00pm - 4:00 pm,   4:00pm - 5:00 pm. 
	},
	status: {
		type: String,
		default: 'Pending' //Done, Expired, Rejected
	},
});

module.exports = mongoose.model('Booking', bookingSchema);
