const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const timeout = 10000;

dotenv.config();
app.use(express.json());

const octokit = new Octokit({
    auth: process.env.TOKEN
});
async function getRepoEvents() {
    octokit.rest.activity.listPublicOrgEvents({
        org: 'codingwithmax-io',
    })

        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

setTimeout(async () => {
    const events = await getRepoEvents();
    console.log('THE EVENTS of the org is: ', events);
}, timeout);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});