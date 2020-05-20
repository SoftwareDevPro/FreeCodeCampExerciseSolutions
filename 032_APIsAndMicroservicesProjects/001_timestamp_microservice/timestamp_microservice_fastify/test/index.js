

const tap = require('tap');
const build_fastify = require('../app');

// Invalid Date
tap.test('GET `/api/timestamp/ZZZ` route', t => {
  
  t.plan(4);

  const fastify = build_fastify();

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/timestamp/ZZZ'
  }, (err, response) => {

    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 400, "400 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");
    t.deepEqual(response.json(), { error: 'Invalid Date' }), "correct response i.e. invalid date in JSON";
  });
});

// No supplied date
tap.test('GET `/api/timestamp` route', t => {
  
  t.plan(5);

  const fastify = build_fastify();

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/timestamp'
  }, (err, response) => {

    const { unix, utc } = response.json();
    
    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 200, "200 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");
    t.true(unix > 0, "unix is greater then 0");
    t.true(utc.indexOf('GMT') !== -1, "resulting UTC has GMT in it");
  });
});


// Supplied Date String
tap.test('GET `/api/timestamp/2005-12-25` route', t => {
  
  t.plan(5);

  const fastify = build_fastify();

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/timestamp/2005-12-25'
  }, (err, response) => {

    const { unix, utc } = response.json();

    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 200, "200 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");
    t.strictEqual(unix, 1135468800000, "unix timestamp check");
    t.strictEqual(utc, 'Sun, 25 Dec 2005 00:00:00 GMT', "utc check");

  });
});

// Supplied Date Milliseconds
tap.test('GET `/api/timestamp/1135468800000` route', t => {
  
  t.plan(5);

  const fastify = build_fastify();

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/timestamp/1135468800000'
  }, (err, response) => {

    const { unix, utc } = response.json();

    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 200, "200 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");
    t.strictEqual(unix, 1135468800000, "unix timestamp check");
    t.strictEqual(utc, 'Sun, 25 Dec 2005 00:00:00 GMT', "utc check");
  });
});


