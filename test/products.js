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

  before(setup);

  it('should respond "OK"', function(done) {
    supertest(app).get('/products/' + this.product.id)
      .accept('json')
      .expect(200, this.product, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(app).get('/products/123456')
      .accept('json')
      .expect(404, done);
  });

  after(cleanup);

});

describe('PUT /products/:id', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    this.product.price += 1.00;

    supertest(app).put('/products/' + this.product.id)
      .send(this.product)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).put('/products/' + this.product.id)
      .send({
        name: '???'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(app).put('/products/1234')
      .accept('json')
      .expect(404, done);
  });

  after(cleanup);

});

describe('DELETE /products/:id', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    supertest(app).del('/products/' + this.product.id)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(app).del('/products/1234')
      .accept('json')
      .expect(404, done);
  });

  after(cleanup);

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
