const {log, error} = require('console');

require('dotenv').config();

const queries = require('./search');

var Twitter = require('twitter');
var config = require('./config.js');

var interval = process.env.INTERVAL || 10000;

var T = new Twitter(config);

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);


log('bot started...\n');

function like() {

  for ( let search of queries) {

    let params = {
      q: search.q,
      count: 20,
      result_type: 'recent',
      lang: 'en'
    };

    T.get('search/tweets', params, function(err, data, response) {
      if(!err){
        
        // Loop through the returned tweets
        //for(let i = 0; i < data.statuses.length; i++){
        for ( let tweet of data.statuses ) {
          // Get the tweet Id from the returned data
          let id = { id: tweet.id_str }
          let {text, retweet_count, favorite_count} = tweet;

          if (tweet.retweet_count > search.limit) {

            T.post('statuses/retweet', id, function(err, response){
              // If the retweet fails, log the error message
              if(err){
               // error(err[0].message);
               return;
              }
              // If the retweet is successful, log the url of the tweet
              else{
                let username = response.user.screen_name;
                let tweetId = response.id_str;
                log('retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
              }
            });

          }

        }

      } else {
        error(err);
      }
    })

  }

};

function run() {
  setInterval(like, interval);
};

run();

