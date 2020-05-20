
const tap = require('tap');
const build_fastify = require('../app');

// Invalid URL
tap.test('GET `/api/whoami/ZZZ` route', t => {
  
  t.plan(6);

  const fastify = build_fastify();

  // At the end of your tests it is highly recommended to call `.close()`
  // to ensure that all connections to external services get closed.
  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/whoami/ZZZ'
  }, (err, response) => {

    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 404, "404 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");

    const resp_json = response.json();

    t.strictEqual(resp_json.message, 'Route GET:/api/whoami/ZZZ not found', "not found error message");
    t.strictEqual(resp_json.error, 'Not Found', "error message");
    t.strictEqual(resp_json.statusCode, 404, "status code");
  });
});

// Nominal case
tap.test('GET `/api/whoami` route', t => {
  
  t.plan(6);

  const fastify = build_fastify();

  t.tearDown(() => fastify.close());

  fastify.inject({
    method: 'GET',
    url: '/api/whoami'
  }, (err, response) => {

    const { unix, utc } = response.json();
    
    t.error(err, "no error during test");
    t.strictEqual(response.statusCode, 200, "200 return code");
    t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");

    const resp_json = response.json();

    t.false(typeof(resp_json.ipaddress) === 'undefined', "response has an ip address");
    t.false(typeof(resp_json.language) === 'undefined', "response has an language");
    t.false(typeof(resp_json.software) === 'undefined' , "response has an software");

  });
});

