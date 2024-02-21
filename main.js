const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path');
const { Octokit } = require('@octokit/rest');
let events = undefined;
const intervalTime = 5000; // 5 seconds
dotenv.config();
app.use(express.json());

const octokit = new Octokit({
    auth: process.env.TOKEN
});

async function getRepoEvents() {
    try {
        const response = octokit.rest.activity.listPublicOrgEvents({
            org: 'codingwithmax-io',
        });
    if(response.data) {
        console.log('New Event: ', response.data[0].id);
        console.log('New Event: ', response.data[0].type);
        console.log('New Event: ', response.data[0].actor.login);
        console.log('New Event: ', response.data[0].created_at);
        console.log('New Event: ', response.data[0].repo.name);
        console.log('New Event: ', response.data[0].payload);
        events = response.data[0];
    } else {
        console.log('No new events');
    }
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

setInterval(getRepoEvents, intervalTime);
getRepoEvents();






app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});