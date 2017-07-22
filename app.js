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
        count: 20,
        lang: 'en'
      };

      log(`GET search/tweets ${params.q}`);
      let tweetResponse = await T.get('search/tweets', params);

      for (let tweet of tweetResponse.statuses) {

        // Get the tweet Id from the returned data
        let id = {
          id: tweet.id_str
        }

        let check = await Tweet.findOne({
          "tid": tweet.id_str
        });

        if (check) {
          log(`#${tweet.id_str} already processed`);
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
          await tt.save();
          T.post('statuses/retweet', id).then(data => {
            log(`POST statuses/retweet/${id}`);
          }).catch(err => {
            error(err);
          });
        }
      }
    }

  } catch (err) {
    error(err);
  }

};

function run() {
  setInterval(like, process.env.INTERVAL || 10000);
};


mongoose.connect(mongo.uri, {
    useMongoClient: true
  })
  .then(() => {

    log('Connection to %s open.', mongo.uri);

    run();

  })
  .catch((err) => {
    error(err.message);
    process.exit(1);
  });