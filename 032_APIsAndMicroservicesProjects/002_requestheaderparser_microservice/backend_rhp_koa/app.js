
const koa_app = require('./server');

// start listening for requests.
const server = koa_app.listen(3000);

module.exports = server;
