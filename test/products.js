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
      .expect(201, done);
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

  after(cleanup);

});

describe('GET /products', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    supertest(app).get('/products')
      .accept('json')
      .expect([
        this.product
      ])
      .expect(200, done);
  });

  after(cleanup);

});

describe('GET /products/:id', function() {

});

describe('PUT /products/:id', function() {

});

describe('DELETE /products/:id', function() {

});

function setup(done) {
  this.product = new mongoose.models.Product({
    name: 'Casual Socks',
    price: 2.99
  });
  this.product.save(done);
  this.product = this.product.toJSON();
}

function cleanup(done) {
  mongoose.models.Product.remove({}, done);
}
