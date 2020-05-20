
const request = require('supertest');
const assert = require('assert');
const app = require('../app');

// Invalid Date
request(app)
  .get('/api/timestamp/ZZZ')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '24')
  .expect(function(res) {
    assert(typeof(res.body.error) != 'undefined');
    assert(res.body.error, 'Invalid Date');
  })
  .end(function(err, res) {
    if (err) throw err;
  });
  
// No supplied date
request(app)
  .get('/api/timestamp')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '60')
  .expect(function(res) {
      assert(typeof(res.body.unix) != 'undefined');
      assert(typeof(res.body.utc) != 'undefined');
      assert(res.body.unix > 0);
      assert(res.body.utc.indexOf('GMT') !== -1);
  })
  .end(function(err, res) {
    if (err) throw err;
  });


// Supplied Date String
request(app)
  .get('/api/timestamp/2005-12-25')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '60')
  .expect(function(res) {
      assert(typeof(res.body.unix) != 'undefined');
      assert(typeof(res.body.utc) != 'undefined');
      assert(res.body.unix == 1135468800000);
      assert(res.body.utc ===  'Sun, 25 Dec 2005 00:00:00 GMT');
  })
  .end(function(err, res) {
    if (err) throw err;
  });

// Supplied Date Milliseconds
request(app)
  .get('/api/timestamp/1450137601110')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '60')
  .expect(function(res) {
      assert(typeof(res.body.unix) != 'undefined');
      assert(typeof(res.body.utc) != 'undefined');
      assert(res.body.unix == 1450137601110);
      assert(res.body.utc ===  'Tue, 15 Dec 2015 00:00:01 GMT');
}).end(function(err, res) {
    if (err) throw err;
});

