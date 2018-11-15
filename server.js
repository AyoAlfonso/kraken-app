'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/slack');
let mongoose = require('mongoose');
let config = require('./config/keys');
let app = express();

require('dotenv').config();

app.set('port', (process.env.PORT));

mongoose.connect(config.DATABASE_URL, { auto_reconnect: true, useNewUrlParser: true, keepAlive: 30000 });
mongoose.connection.on('open', function () {
	console.log('Connected to mongo server.');
});

mongoose.connection.on('error', function (err) {
	console.log('Could not connect to mongo server!');
	return console.log(err);
});
/* Confirms Redirect http to https */
// app.use('*', function (req, res, next) {
//   let status = 302;
//   if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
//     res.redirect(status, 'https://' + req.hostname + req.originalUrl);
//     return
//   }
//   else
//     next()
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/', routes);

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});