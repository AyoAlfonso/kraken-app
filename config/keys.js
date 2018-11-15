require('dotenv').config();

module.exports = {
	PORT: process.env.PORT || 3030,
	DATABASE_URL: process.env.DATABASE_URL,
	SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
	SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
	SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
	verificationToken: process.env.verificationToken,
	callbackUrl: process.env.callbackUrl
};
