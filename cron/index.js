let fs = require('fs')
let path = require('path');
require('dotenv').config();
let Keys = require('../keys')
let CronJob = require('cron').CronJob;
let request = require('request');

//To-Do
/**
 * 
 * Announce to users to book rooms
 * Let lead approve or leave comment if he has a problem with the requests to resolve.
 * Make Peer coding requests with Descriptions -> Remind users based no your time frequency, sho
 * Make 
 * Make
 */
module.exports = {
    roomRequestjob: function () {
        var job_a = new CronJob({
            cronTime: "02 14 * * *", //10:00 am (morning) every day.  //  02 14 * * *   // */15 * * * * *  
            onTick: async function () {
                console.log(`Sending room requests..`)
            }
        })
    },
    pullRequestReminders: function () {
        var job_a = new CronJob({
            cronTime: "02 14 * * *", //10:02 am (morning) every day.  //  02 14 * * *   // */15 * * * * *  
            onTick: async function () {
                console.log(`Sending room requests..`)
            }
        })
    },
    peerCodingReminders: function () {
        var job_a = new CronJob({
            cronTime: "02 14 * * *", //10:04 am (morning) every day.  //  02 14 * * *   // */15 * * * * *  
            onTick: async function () {
                console.log(`Sending room requests..`)
            }
        })
    },
    taskReminders: function () {
        var job_a = new CronJob({
            cronTime: "02 14 * * *", //10:06 am (morning) every day.  //  02 14 * * *   // */15 * * * * *  
            onTick: async function () {
                console.log(`Sending room requests..`)
            }
        })
    },
    monthlySetAppointment: function () {
        var job_a = new CronJob({
            cronTime: "02 14 * * *", //09:30 am (morning) every day.  //  02 14 * * *   // */15 * * * * *  
            onTick: async function () {
                console.log(`Sending room requests..`)
            }
        })
    },
}
let options = {
    method: 'POST',
    uri: `${keys.GoCardless.URL}/redirect_flows/${redirectFlowId}/actions/complete`,
    headers: keys.GoCardless.getHeader(token),
    body: {
        data: {
            session_token
        }
    },
    json: true // Automatically stringifies the body to JSON
}


let payload = {
    "text": "Room Approval",
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "Your approval is requsted to approve room",
            "fallback": "You are unable to approve a room now",
            "callback_id": "sitting_arrangement_approval",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "zonetechpark_list",
                    "text": "Who should have the room?",
                    "type": "select",
                    "data_source": "users"
                }
            ]
        }
    ]
}


payload.attachments.actions.push(roomRequests)

