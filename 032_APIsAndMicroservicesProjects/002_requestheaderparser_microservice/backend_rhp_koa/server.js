
// required packages.
const koa = require('koa');
const router = require('@koa/router')();
const logger = require('koa-logger');
const json = require('koa-json');
const ip = require("ip");

// The koa application.
const app = new koa();

// Used to determine console logging.
const dev = app.env === 'development';

const hostname = require('os').hostname();
if (dev) {
    console.log("hostname:=" + hostname);
}

router.get('/api/whoami', async function(ctx, next) {

    const software = ctx.headers['user-agent'].split(' ');

    const is_lang_undef = typeof(ctx.headers['accept-language']) === 'undefined'; 
    
    const data = {
        ipaddress: ip.address(),
        language: (is_lang_undef ? '' : ctx.headers['accept-language'].split(',')[0]),
        software: software.join(' ')
    }
    
    ctx.body = data;
});

// setup the middleware and routes.
app.use(json());
app.use(logger());
app.use(router.routes());

module.exports = app;

