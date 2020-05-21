
const tap = require('tap');
const build_fastify = require('../app');

tap.test('POST `/api/shorturl/new` route', t => {
  
    t.plan(5);
  
    const fastify = build_fastify();
  
    t.tearDown(() => fastify.close());
  
    fastify.inject({
      method: 'POST',
      url: '/api/shorturl/new',
      payload: {
          original_url: 'http://www.google.com'
      }
    }, (err, response) => {
  
      t.error(err, "no error during test");
      t.strictEqual(response.statusCode, 200, "200 return code");
      t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8', "JSON return type");
  
      const resp_json = response.json();
      console.log(resp_json);

      t.false(typeof(resp_json.original_url) === 'undefined');
      t.false(typeof(resp_json.short_url) === 'undefined');

    });
});

