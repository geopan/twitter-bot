const {log, error} = require('console');

require('dotenv').config();

var Twitter = require('twitter');
var config = require('./config.js');

var interval = process.env.INTERVAL || 10000;

var T = new Twitter(config);

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
// Set up your search parameters
var params = {
  q: '#gis -esri -filter:retweets filter:links',
  //q: 'from:Mapbox -esri -arcgis -filter:retweets filter:links',
  count: 20,
  result_type: 'recent',
  lang: 'en'
}

log('bot started...\n');

function like() {

  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      
      // Loop through the returned tweets
      //for(let i = 0; i < data.statuses.length; i++){
      for ( let tweet of data.statuses ) {
        // Get the tweet Id from the returned data
        let id = { id: tweet.id_str }
        let {text, retweet_count, favorite_count} = tweet;

        if (tweet.retweet_count > 2) {

          // Try to Favorite the selected Tweet
          T.post('favorites/create', id, function(err, response){
            // If the favorite fails, log the error message
            if(err){
              console.log(err[0].message);
            }
            // If the favorite is successful, log the url of the tweet
            else{
              let username = response.user.screen_name;
              let tweetId = response.id_str;
              console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
            }
          });

        }

      }

    } else {
      RangeError(err);
    }
  })

};

function run() {
  setInterval(like, interval);
};

run();

