
const workspace = require('../model/workspace');
const crypto = require('crypto');
const apiUrl = 'https://slack.com/api';
require('dotenv').config();

let getNewAccessToken = async function (REFRESH_TOKEN) {
    const arg = {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token'
    };
    return axios.post(`${apiUrl}/oauth.access`, qs.stringify(arg));
}

module.exports = {
    isVerified: (req) => {
        const signature = req.headers['x-slack-signature'];
        const timestamp = req.headers['x-slack-request-timestamp'];
        const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
        const [version, hash] = signature.split('=');

        const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
        if (timestamp < fiveMinutesAgo) return false;

        hmac.update(`${version}:${timestamp}:${req.rawBody}`);

        return hmac.digest('hex') === hash;
    },
    getAccessToken: async (workspaceId) => {
        const tokenData = await workspace.find({ workspaceId });
        if (tokenData.expiry_time < Date.now()) {
            return tokenData.access_token.token;
        } else {
            const result = await getNewAccessToken(tokenData.access_token.refresh_token);
            workspaceSchema()
            return result.data.access_token;
        }
    }
}
