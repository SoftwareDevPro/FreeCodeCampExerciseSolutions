
const path = require('path');

require('dotenv').config();

const config = {
    port: process.env.APP_PORT, // process.env.APP_PORT
    redis: {
        host: 'localhost',      // process.env.REDIS_HOST
        port: '6379',           // process.env.REDIS_PORT
        password: ''            // process.env.REDIS_PASSWORD
    }
}

module.exports = config;