
const redisConnection = require('../redisClientConnection');

// test redis server
redisConnection.set('foo', 'bar');
    redisConnection.get('foo', function (err, res) {
        console.log(res.toString()); 
    });


// Retrieving a string value from Redis if it already exists for this key - Redis cache example 
redisConnection.get('myStringKey', (err, value) => {
    if (value) {
        console.log('The value associated with this key is: ' + value)
    } else { 
        // Storing a simple string in the Redis store
        redisConnection.set('myStringKey', 'LogRocket Redis Tutorial');
    }
});