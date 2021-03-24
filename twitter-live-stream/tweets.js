var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');
 
var keys = {
    consumer_key : "enter your keys",
    consumer_secret : 'enter your keys',
    token : 'enter your keys',
    token_secret : 'enter your keys'
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    follow: ['1356707286375350276', // twitter account for us to test
    '41595438', // DCULIB
    '72534962', // DCUSU
    '70713759' // DCU
]
});

Twitter.pipe(fs.createWriteStream('dcuTweets.json'));

// https://www.npmjs.com/package/twitter-stream-api
// npm install twitter-stream-api
// npm install fs
