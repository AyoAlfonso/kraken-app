const express = require('express');
const router = express.Router();
const config = require('../config/keys');
const axios = require('axios');
const bookings = require('../model/bookings');
const leaderboard = require('../model/leaderboard');
const peerCodingRequest = require('../model/peerCodingRequest');
const pullRequests = require('../model/pullRequests');
const workspace = require('../model/workspace');
const rooms = require('../model/rooms');
const tasks = require('../model/tasks');
const { isVerified } = require('../helpers/slack');
const qs = require('qs');
const apiUrl = 'https://slack.com/api';


let setAccessToken = async (team_id, team_name, bot, access_token, refresh_token, expires_in) => {
    const data = {
        bot_user_id: bot.bot_user_id,
        bot_access_token: bot.bot_access_token,
        workspaceName: team_name,
        workspaceId: team_id,
        access_token: {
            token: access_token,
            refresh_token,
            expiry_time: Date().now() + (1000 * expires_in)
        }
    }
    await workspace.create(data);
}

router.get('/', (req, res) => {
    res.send({ code: 200, message: "welcome to kraken api!" });
});

router.get('/auth', (req, res) => {
    if (!req.query.code) { // access denied
        res.redirect('/?error=access_denied');
        console.log('error=access_denied');
        return;
    }
    const authInfo = {
        client_id: config.SLACK_CLIENT_ID,
        client_secret: config.SLACK_CLIENT_SECRET,
        code: req.query.code
    };

    axios.post(`${apiUrl}/oauth.access`, qs.stringify(authInfo))
        .then((result) => {
            // The payload data has been modified since the last version!
            // See https://api.slack.com/methods/oauth.access
            console.log(result.data);
            const { team_id, team_name, bot, access_token, refresh_token, expires_in, error } = result.data;

            setAccessToken(team_id, team_name, bot, access_token, refresh_token, expires_in)

            if (error) {
                res.sendStatus(401);
                console.log(error);
                return;
            }

            // This link will open the workspace in Slack client, 
            // however, I am calling extra API for the tutorial to show you how to use Web API.
            // res.redirect(`slack://open?team=${team_id}`);

            // When you call Web APIs, you need to check if your access_token (xoxa-) is expired (60min) and if it is, get a fresh access token with your refresh_token (xoxr-).  
            // However, in this scenario, because you are calling this API immediately after the initial OAuth, access_token is not expired thus you can just use it.
            // See the additional code sample in the end of this file.

            axios.post(`${apiUrl}/team.info`, qs.stringify({ token: access_token })).then((result) => {
                if (!result.data.error) {
                    res.redirect(`http://${result.data.team.domain}.slack.com`);
                }
            }).catch((err) => { console.error(err); });

        }).catch((err) => {
            console.error(err);
        });
});


router.post('/slackactivity', function (req, res) {
    if (req.body.callback_id == "sitting_arrangement_approval") {
        req.body.channel.id
        req.body.channel.name
        req.body.user.id
        req.body.user.name
        req.body.actions[0].name
        req.body.actions[0].selected_options[0].value //Only one action allowed anyway(choose out of the applicants) and then one selectable option(for succssful applicant).
    }
    let data = {
        form: {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: req.query.code
        }
    };
    request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // You are done.
            // If you want to get team info, you need to get the token here
            let token = JSON.parse(body).access_token; // Auth token
        }
    });
});
router.post('/commands', async (req, res) => {
    console.log(req.body)


    if (!signature.isVerified(req)) { // the request is NOT coming from Slack!
        res.sendStatus(404);
        return;
    }
    let message = {};
    if (req.body.text) {
        const code = req.body.text;

        if (! /^\d+$/.test(code)) { // not a digit
            res.send(':crying_cat_face:U R DOIN IT WRONG. Enter a status code like 200');
            return;
        }

        const status = httpstatus[code];
        if (!status) {
            res.send('Bummer, ' + code + ' is not a HTTP status code :scream_cat:');
            return;
        }

        message = {
            response_type: 'in_channel', // public to the channel
            attachments: [
                {
                    pretext: `${code}: ${status}`,
                    image_url: `https://${req.hostname}/images/${code}.jpg`
                }
            ]
        };
    } else {
        message = {
            response_type: 'ephemeral', // private message
            text: ':cat: How to use `/httpstatus` command:',
            attachments: [
                {
                    text: 'Type a status code after the command, _e.g._ `/httpstatus 404`'
                }
            ]
        };
    }
    // {
    //     token: 'K8A8pyHF8V3fBzJ6dpayY0jy',
    //     team_id: 'T09FPNA87',
    //     team_domain: 'mytoddlr',
    //     channel_id: 'C7ZAT3YHF',
    //     channel_name: 'standup-channel',
    //     user_id: 'U7W8H0XAB',
    //     user_name: 'ayo',
    //     command: '/k-rooms',
    //     text: 'book spaceA',
    //     response_url: 'https://hooks.slack.com/commands/T09FPNA87/476115704064/PfZiQYenIyLDDrnpuX7hdzkK',                                trigger_id: '476248184209.9533758279.6a32e94107e347bb8f17235528efc193'
    // }

    //     { token: 'K8A8pyHF8V3fBzJ6dpayY0jy',
    //   team_id: 'T09FPNA87',
    //   team_domain: 'mytoddlr',
    //   channel_id: 'C7ZAT3YHF',
    //   channel_name: 'standup-channel',
    //   user_id: 'U7W8H0XAB',
    //   user_name: 'ayo',
    //   command: '/k-rooms',
    //   text: '',
    //   response_url: 'https://hooks.slack.com/commands/T09FPNA87/476112867984/LaJuusRgibzMmFL0O7q6mqsG',
    //   trigger_id: '476748233331.9533758279.293987c8482afaa79d1a4d3cc751bcaa' }

    if (req.body.command == '/k-rooms') {
        let text = req.body.text.split(' ')
        if (text[0] == 'book') {
            if (!text[1]) {
                res.send({ code: 400, message: "No Room specified!, please do something like `/k-rooms book roomA`" });
            }

            if (text[1]) {
                let selectedRoom = await rooms.findOne({ roomName: text[1] })
                if (!selectedRoom) {
                    res.send({ code: 400, message: "Specified room doesnt exist, choose from these!" });
                }
                let bookingData = {
                    owner: req.body.user_id,
                    roomCode: selectedRoom.roomCode
                }
                bookings.create({ bookingData })
                //Respond with a dialog modal and update the booking with the (endTime, status and the startTime)
            }
        }
        if (req.body.text = '') {
            let rooms = await rooms.find({ status: "Pending" })
            res.send({ code: 200, rooms: rooms });
        }
    }

    res.send({ code: 200, message: "welcome to kraken api!" });
});

module.exports = router
