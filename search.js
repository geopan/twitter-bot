'use strict';

module.exports = [
    {
        q: '#gis -esri -filter:retweets filter:links',
        limit: 5
    }, {
        q: '#geospatial -esri -filter:retweets filter:links',
        limit: 5
    }, {
        q: 'ethereum filter:links',
        limit: 50
    }, {
        q: '#blockchain filter:links',
        limit: 50
    }, {
        q: '#deeplearning filter:links',
        limit: 50
    }, {
        q: '#nodejs filter:links',
        limit: 50
    }, {
        q: '#golang filter:links',
        limit: 50
    }, {
        q: '#TensorFlow  filter:links',
        limit: 50
    }, {
        q: '#kaggle  filter:links',
        limit: 50
    }, {
        q: 'MachineLearning filter:links',
        limit: 50
    }
];