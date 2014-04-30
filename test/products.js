var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /products', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).post('/products')
      .send({
        name: 'Casual Socks',
        price: 2.99
      })
      .accept('json')
      .expect(201, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .send({
        name: '?'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .send({
        name: 'Casual Socks'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .send({
        name: 'Casual Socks',
        price: 100000
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .send({
        name: 'Casual Socks',
        price: -0.01
      })
      .accept('json')
      .expect(400, done);
  });

  after(hooks.products.remove);

});

describe('GET /products', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products')
      .accept('json')
      .expect([
        this.product
      ])
      .expect(200, done);
  });

  after(hooks.products.remove);

});

describe('GET /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products/' + this.product.id)
      .accept('json')
      .expect(200, this.product, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/products/123456')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.products.remove);

});

describe('PUT /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    this.product.price += 1.00;

    supertest(this.app).put('/products/' + this.product.id)
      .send(this.product)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/' + this.product.id)
      .send({
        name: '???'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/1234')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.products.remove);

});

describe('DELETE /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).del('/products/' + this.product.id)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/products/1234')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.products.remove);

});
