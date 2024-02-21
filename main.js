const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path');
const { Octokit } = require('@octokit/rest');

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
            console.log('SUCCESS THE DATA IS: ', data.data[0]);
        })
        .catch((error) => {
            console.log(error);
        });
}

getRepoEvents();


app.post('/webhook', (req, res) => {

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});