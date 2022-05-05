const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    legacyMode: true,
    port: process.env.REDPORT
});

redisClient.connect();

redisClient.on('error', function (err) {
    console.error('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function(err) {
    console.log('Connected to redis successfully');
});

module.exports = redisClient;