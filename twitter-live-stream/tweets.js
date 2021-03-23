var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');
 
var keys = {
    consumer_key : "FuAP6sEa1ZDppZf6LI9UugQuS",
    consumer_secret : 'b7tojxlGIdvl8wGqkOAAWCwpHtaAQ5ktCPlCyEwwe9cvJPZY4r',
    token : '1066547785-TeDI8q90dwRJWT9JMm4YlBetjmQhKN0v93ekhJy',
    token_secret : 'dnoUD7C3qThMj0yZoxRCQoBkgiZE6XPmuGMLH3zjBNOCL'
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