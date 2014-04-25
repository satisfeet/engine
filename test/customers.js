var chai      = require('chai');
var supertest = require('supertest');

var app = require('../lib');

describe('HTTP: customers', function() {

  var model = {
    name: 'Willy Smith',
    email: 'willy@example.io',
    address: {
      street: 'Geiserichstraße 3',
      city: 'Berlin',
      zip: 12105
    }
  };

  describe('POST /customers', function() {

    it('should respond error', function(done) {
      supertest(app.listen()).post('/customers')
        .end(function(err, res) {
          //if (err) return done(err);

          console.log(res.body);

          done();
        });
    });

  });

  describe('GET /customers', function() {

  });

  describe('GET /customers/:param', function() {

  });

  describe('PUT /customers/:param', function() {

  });

  describe('DELETE /customers/:param', function() {

  });

});
