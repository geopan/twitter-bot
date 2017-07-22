'use strict';

// List of the topic and user for Twitter GET/search

module.exports = [
    {
        // #gis without the word esri including a link
        q: '#gis -esri filter:links',
        limit: 20
    }, {
        q: '#geospatial -esri filter:links',
        limit: 20
    }, {
        // Tweet from mapbox without the word esri including a link
        q: 'from:Mapbox -esri filter:links',
        limit: 20
    }, {
       q: 'from googlemaps filter:links',
       limit: 20
    }, {
       q: '#maps filter:media OR map filter:media',
       limit: 50
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