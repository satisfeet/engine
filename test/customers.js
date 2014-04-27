var chai      = require('chai');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('HTTP: customers', function() {

  describe('POST /customers', function() {

    it('should respond error', function(done) {
      supertest(app).post('/customers')
        .accept('json')
        .expect(400, done);
    });

    it('should respond error', function(done) {
      supertest(app).post('/customers')
        .send({
          name: 'W??'
        })
        .accept('json')
        .expect(400, done);
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
