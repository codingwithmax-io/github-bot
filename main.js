const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path');
const { Octokit } = require('@octokit/rest');
let events = undefined; // these are the latest events from the GitHub API & Org.
const { sameDay, format } = require('@formkit/tempo');
const intervalTime = 5000; // 5 seconds
dotenv.config();
app.use(express.json());

const octokit = new Octokit({
    auth: process.env.TOKEN
});

/**
 * Fetches the latest repository events from the GitHub API using the Octokit library.
 */
async function getRepoEvents() {
  try {
    const response = octokit.rest.activity.listPublicOrgEvents({
      org: 'codingwithmax-io',
    });
    // repo events are returned in an array
    events = (await response).data[0];
    /**
     * If the response status is 200 (OK), log the following event properties:
     * - Event type
     * - Event actor
     * - Created at
     * - Repo
     * - Payload
     */
    if ((await response).status === 200) {
      console.log('Event Type: ', events.type);
      console.log('Event Actor: ', events.actor.login);
      const sameTime = sameDay(events.created_at, new Date());
      console.log('the same time is: ', sameTime);
      // TODO: events.created_at can be used to check if the event is new by comparing it to the last event created at
            if (sameTime) {
                console.log('Something happened on the same day in the organisation');
            }

      console.log('Created At: ', format(events.created_at));
      console.log('Repo: ', events.repo.name);
      console.log('Payload: ', events.payload);
    }
    /**
     * If the response status is 304 (Not Modified), log the following event properties:
     * - New event ID
     * - New event type
     * - New event actor
     * - New event created at
     * - New event repo
     * - New event payload
     */
    else if ((await response).status === 304) {
      console.log('New Event: ', events.id);
      console.log('New Event: ', events.type);
      console.log('New Event: ', events.actor.login);
      console.log('New Event: ', events.created_at);
      console.log('New Event: ', events.repo.name);
      console.log('New Event: ', events.payload);
    }
    /**
     * If the response status is anything else, log the error.
     */
    else {
      console.log('No new events');
    }
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

setInterval(getRepoEvents, intervalTime);
const wait = ms => new Promise(res => setTimeout(res, ms));
async function init() {
    console.log('Starting');
    await wait(3000);
    getRepoEvents();
    console.log('Done');
}

init();






app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});