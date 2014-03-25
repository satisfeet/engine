var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app = require('../lib');

var article = {
  name: 'Die Blauen Socken',
  vat: 0.19,
  price: 2.99,
  category: 'Socken'
};

describe('HTTP: articles', function() {

  describe('GET /articles', function() {

    it('should respond json', function(done) {
      supertest(app).get('/articles').accept('json')
        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });

  });

});
