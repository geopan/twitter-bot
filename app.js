'use strict';

require('dotenv').config();
const {
  log,
  error
} = require('console');

const queries = require('./search');
const Twitter = require('twitter');
const {
  twitter,
  instagram,
  mongo
} = require('./config.js');

const mongoose = require('mongoose');
mongoose.Promise = Promise;

let TweetSchema = new mongoose.Schema({
  tid: String,
  tweet: Object
});

TweetSchema.index({
  'tid': 1
});

const Tweet = mongoose.model('Tweet', TweetSchema);

var T = new Twitter(twitter);


log('bot started...\n');

async function like() {

  try {

    for (let search of queries) {

      let params = {
        q: search.q,
        count: 5,
        result_type: 'recent',
        lang: 'en'
      };

      log(`get: search/tweets ${params.q}`);
      let tweetResponse = await T.get('search/tweets', params); //, async function(err, data, response) {

      for (let tweet of tweetResponse.statuses) {

        // Get the tweet Id from the returned data
        let id = {
          id: tweet.id_str
        }

        let check = await Tweet.findOne({
          "tid": tweet.id_str
        });

        if (check) {
          log(`${id} already processed`);
          continue;
        }

        let tt = new Tweet({
          tweet: tweet,
          tid: tweet.id_str
        });

        let {
          text,
          retweet_count,
          favorite_count
        } = tweet;

        if (tweet.retweet_count > search.limit) {
          log(`post: statuses/retweet ${id}`);
          let post = await T.post('statuses/retweet', id);

          await tt.save();
          let username = post.user.screen_name;
          let tweetId = post.id_str;
          log('retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)

        }/* else {

          log(`post: favorites/create ${id}`);
          let post = await T.post('favorites/create', id);

          await tt.save();
          let username = post.user.screen_name;
          let tweetId = post.id_str;
          log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)

        }*/
      }
    }


  } catch (err) {
    error(err);
  }

};

function run() {
  setInterval(like, process.env.INTERVAL || 10000);
};


mongoose.connect(mongo.uri)
  .then(() => {

    log('Connection to %s open.', mongo.uri);

    run();

  })
  .catch((err) => {
    error(err.message);
    process.exit(1);
  });