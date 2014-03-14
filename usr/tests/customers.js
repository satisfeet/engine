var chai      = require('chai');
var supertest = require('supertest');

var app = require('../../lib');

describe('HTTP: customers', function() {

  describe('GET /customers', function() {

    it('should respond json', function(done) {
      supertest(app).get('/customers').accept('json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

  describe('POST /customers', function() {

  });

  describe('GET /customers/:id', function() {

  });

  describe('PUT /customers/:id', function() {

  });

  describe('DELETE /customers/:id', function() {

  });

});
