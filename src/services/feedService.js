import API from './baseService';

export const getFeed = () =>
  API.get('/api/feed/').then(response => response.data);

/*
export async function getFeed() {
  let posts = [];

  const samplePost1 = {
    "sender": {
      "user": "5dbcff12e0354c001588ff99", "pushToken": "ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]"
    },
    "publishedAt": "2020-01-05T21:37:17.345Z",
    "push": true,
    "channel": "5e0bdfd40fe5080015cadab7",
    "locale": "en",
    "text": "Come out on Saturday morning and help us feed the boys\n\nhttps://www.facebook.com/events/s/2020-cfc-invitational-tryouts/478242509733366/",
    "images": [],
    "attachments": []
  }
  const samplePost2 = {
    "sender": {
      "user": "5dbcff12e0354c001588ff99", "pushToken": "ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]"
    },
    "publishedAt": "2020-01-05T21:37:17.345Z",
    "push": true,
    "channel": "5e0bdfd40fe5080015cadab7",
    "locale": "en",
    "text": "Hey idiots learn this song",
    "images": [],
    "attachments": [
      { "type": "song", "_id": "5c55ac50738e1400140b6eeb" }
    ]
  }
  const samplePost3 = {
    "sender": {
      "user": "5dbcff12e0354c001588ff99", "pushToken": "ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]"
    },
    "publishedAt": "2020-01-05T21:37:17.345Z",
    "push": true,
    "channel": "5e0bdfd40fe5080015cadab7",
    "locale": "en",
    "text": "Welcome back Juan!",
    "images": [],
    "attachments": [
      { "type": "player", "_id": "5e164b22e49be600151ce3fa" }
    ]
  }
  const samplePost4 = {
    "sender": {
      "user": "5dbcff12e0354c001588ff99", "pushToken": "ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]"
    },
    "publishedAt": "2020-01-05T21:37:17.345Z",
    "push": true,
    "channel": "5e0bdfd40fe5080015cadab7",
    "locale": "en",
    "text": "Be advised",
    "images": [],
    "attachments": [
      { "type": "gknickname", "data": { "nickname": "Traffic Cone", "backgroundColor": "darkorange", "textColor": "white" } }
    ]
  }
  const samplePostVerbose = {
    "sender": {
      "user": "5dbcff12e0354c001588ff99", "pushToken": "ExponentPushToken[NQjQBqBjcnAfQk8N-3R2al]"
    },
    "publishedAt": "2020-01-05T21:37:17.345Z",
    "push": true,
    "channel": "5e0bdfd40fe5080015cadab7",
    "locale": "en",
    "text": "Text body of post\nWith\nMany\nLines\n*And markdown*",
    "images": [],
    "attachments": [
      { "type": "player", "_id": "5e164b22e49be600151ce3fa" },
      { "type": "song", "_id": "5c55ac50738e1400140b6eeb" },
      { "type": "song", "data": { "title": "Custom Title", "lyrics": "Custom lyrics" } },
      { "type": "masstweet", "data": { "rosterId": "5ded801cbed37e0015d4fdf2" } },
      { "type": "gknickname", "data": { "nickname": "Traffic Cone", "backgroundColor": "darkorange", "textColor": "white" } }
    ]
  }
  //posts.push(samplePostVerbose);
  posts.push(samplePost1)
  posts.push(samplePost2)
  posts.push(samplePost3)
  posts.push(samplePost4)
  posts.push(samplePostVerbose)

  // return the post or an empty array
  //if (Math.round(Math.random()))
  if (true)
    return posts;
  else
    return [];
}
*/

export const createPost = (post, token) =>
  API.post(
    '/api/feed',
    post,
    {
      headers: {
        'Authorization': "Bearer " + token
      }
    }
  )
    .then(response => response.data);
