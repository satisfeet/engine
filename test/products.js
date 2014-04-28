var chai      = require('chai');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('POST /products', function() {

  it('should respond "Created"', function(done) {
    supertest(app).post('/products')
      .send({
        name: 'Casual Socks',
        price: 2.99
      })
      .accept('json')
      .expect(201, {}, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/products')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/products')
      .send({
        name: '?'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/products')
      .send({
        name: 'Casual Socks'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/products')
      .send({
        name: 'Casual Socks',
        price: 100000
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/products')
      .send({
        name: 'Casual Socks',
        price: -0.01
      })
      .accept('json')
      .expect(400, done);
  });

  after(function(done) {
    mongoose.models.Product.remove({}, done);
  });

});

describe('GET /products', function() {

  var models;

  before(function(done) {
    mongoose.models.Product.create([
      { name: 'Casual Socks', price: 2.99 },
      { name: 'Working Socks', price: 5.99 }
    ], function(err) {
      if (err) throw err;

      models = [].slice.call(arguments, 1).map(function(model) {
        return model.toJSON();
      });

      done();
    });
  });

  it('should respond "OK"', function(done) {
    supertest(app).get('/products')
      .accept('json')
      .expect(200, models, done);
  });

});

describe('GET /products/:id', function() {

});

describe('PUT /products/:id', function() {

});

describe('DELETE /products/:id', function() {

});
