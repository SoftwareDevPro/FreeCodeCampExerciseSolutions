
const request = require('supertest');
const assert = require('assert');
const app = require('../app');

// Invalid URL
request(app)
  .get('/api/whoami/abc')
  .expect('Content-Type', "text/html; charset=utf-8")
  .expect('Content-Length', '2182')
  .expect(function(res) {
      assert(res.status === 404);
  })
  .end(function(err, res) {
    if (err) throw err;
});
  
// Nominal Case
request(app)
  .get('/api/whoami')
  .expect(200)
  .expect('Content-Type', /json/)
  .expect(function(res) {
    // these will all vary depending on where the tests
    // are executed, just make sure the field exists.
    assert(typeof(res.body.ipaddress) != 'undefined');
    assert(typeof(res.body.language) != 'undefined');
    assert(typeof(res.body.software) != 'undefined');
  })
  .end(function(err, res) {
    if (err) throw err;
});
