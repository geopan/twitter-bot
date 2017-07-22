'use strict';

module.exports = [
    {
        q: '#gis -esri -filter:retweets filter:links',
        limit: 20
    }, {
        q: '#geospatial -esri -filter:retweets filter:links',
        limit: 20
    }, {
        q: 'from:Mapbox -esri -filter:retweets filter:links',
        limit: 20
    }, {
       q: 'from googlemaps filter:links',
       limit: 20
    }, {
        q: 'ethereum filter:links',
        limit: 100
    }, {
        q: '#blockchain filter:links',
        limit: 100
    }, {
        q: '#deeplearning filter:links',
        limit: 100
    }, {
        q: '#nodejs filter:links',
        limit: 100
    }, {
        q: '#golang filter:links',
        limit: 100
    }, {
        q: '#TensorFlow  filter:links',
        limit: 100
    }, {
        q: '#kaggle  filter:links',
        limit: 50
    }, {
        q: 'MachineLearning filter:links',
        limit: 100
    }
];