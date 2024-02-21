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
    octokit.rest.activity.listRepoEvents({
        owner: 'codingwithmax-io',
        repo: 'github-bot'
    })

        .then((data) => {
            console.log(data.data);
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