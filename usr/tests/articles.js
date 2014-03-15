var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app = require('../../lib');

var article = {
  name: 'Die Blauen Socken',
  vat: 0.19,
  price: 2.99,
  category: 'Socken'
};

describe('HTTP: articles', function() {

  xdescribe('GET /articles', function() {

    it('should respond json', function(done) {
      supertest(app).get('/articles').accept('json')
        .expect('Content-Type', /json/)
        .expect(200, [customer], done);
    });

  });

  xdescribe('DELETE /articles/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/articles/' + customer.id).accept('json')
        .expect(200, done);
    });

  });

});
