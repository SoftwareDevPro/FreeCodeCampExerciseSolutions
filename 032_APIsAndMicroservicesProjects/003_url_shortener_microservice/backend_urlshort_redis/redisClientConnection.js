
const redis = require('redis');
const config = require('./config');

const client = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true});

// UNCOMMENT if there is a different user/password
//client.auth(config.redis.password);

client.on('error', error => console.error('Error Connecting to the Redis Cluster', error));

client.on('connect', () => {
    console.log('Successfully connected to the Redis cluster!');
});

client.on('ready', () => {
  console.log('redis ready');
});

client.on('reconnecting', () => {
  console.log('redis reconnecting');
});


module.exports = client;
