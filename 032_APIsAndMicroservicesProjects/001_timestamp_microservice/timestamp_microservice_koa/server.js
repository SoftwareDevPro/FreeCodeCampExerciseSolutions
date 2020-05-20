
// required packages.
const koa = require('koa');
const router = require('@koa/router')();
const logger = require('koa-logger');
const json = require('koa-json');

// The koa application.
const app = new koa();

// Used to determine console logging.
const dev = app.env === 'development';

// router for no timestamp provided, sends back current date.
router.get("/api/timestamp", function (ctx, next) {
    if (dev) {
        console.log("no timestamp provided, return current");
    }
    const curdate = new Date();
    ctx.body = { unix: curdate.getTime(), utc: curdate.toUTCString() };
});

// router for timestamp provided, attempts to parse the date
// string passed, and send back the timestamp in json.
router.get("/api/timestamp/:date_string", function (ctx, next) {
  
    let d;

    const date_string = ctx.params.date_string;
    
    if (date_string.indexOf('-') === -1 && ! isNaN(parseInt(date_string))) {
        d = new Date(parseInt(date_string));    
    } else {
        d = new Date(date_string);
    }
  
    if (isNaN(d)) {
        if (dev) {
            console.log("invalid date/number provided");
        }
        ctx.body = { error: "Invalid Date" };
      } else {
        if (dev) {
            console.log("date/number provided in URL");
        }
        ctx.body = { unix: d.getTime(), utc: d.toUTCString(), };
    }
});

// setup the middleware and routes.
app.use(json());
app.use(logger());
app.use(router.routes());

module.exports = app;

