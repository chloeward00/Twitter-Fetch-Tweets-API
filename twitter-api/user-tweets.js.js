const fs = require('fs');
const Twitter = require('twitter');
const config = require('./config');
const client = new Twitter(config.twitter);

// to change amount of tweets being pulled 
const tweetsToPull = 10;
// can add other dcu accounts here 
const dcuAccounts = [ 
  'DCULIB',
  'DCU',
  'DCUSU'
];

const getTweets = (user) => new Promise((resolve, reject) => {
    // parameters given, include_rts from twitter api set to false because we don't want them (or do we?)
  const params = { 
    screen_name: user,
    count: tweetsToPull,
    include_rts: false,
    exclude_replies: true,
   
  };
  // API END POINT given on twitter developers
  client.get('statuses/user_timeline', params, (err, tweets, res) => {
    if (err) {
      return reject(err);
    }
    return resolve(tweets);
  });
});
const start = async () => {
  const promises = [];
  const tweetObj = {}; // Object since it's <user>: [tweets]
  let numTweets = 0;
  // Get tweets
  dcuAccounts.forEach((user) => {

    promises.push(new Promise(async (resolve, reject) => {

      const tweets = await getTweets(user);

      tweetObj[user] = tweets;

      numTweets += tweets.length;

      resolve();
    }));
  });
  await Promise.all(promises);
  
  // Manipulate tweets, we want to store the text, date posted and metadata about the user
  let result = {};

  Object.keys(tweetObj).forEach((user) => {
    // Can be empty, so skip
    if (!tweetObj[user]) {
      return;
    }
    if (!result[user]) {

      result[user] = {};
    }
    result[user]['tweets'] = tweetObj[user].map((tweet) => ({
      created_at: tweet.created_at,

      text: tweet.text
    }));
    
    result[user]['metadata'] = {
      id: tweetObj[user][0]['user']['id_str'],
      name: tweetObj[user][0]['user']['name'],
      screen_name: tweetObj[user][0]['user']['screen_name'],
      description: tweetObj[user][0]['user']['description'],
  
    }
  })
  // Save as JSON
  fs.writeFileSync('./results.json', JSON.stringify(result,null, 2), 'utf8');

  console.log(`${numTweets} tweets pulled from ${dcuAccounts}`);
};
start();

// npm install fs 
// then npm install twitter --save
// to run do: node index.js