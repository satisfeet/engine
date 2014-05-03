var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /products', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .send({
        name: 'Casual Socks',
        price: 2.99
      })
      .expect(201, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .send({
        name: '?'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .send({
        name: 'Casual Socks'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .send({
        name: 'Casual Socks',
        price: 100000
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .send({
        name: 'Casual Socks',
        price: -0.01
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/products')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('GET /products', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products')
      .auth(this.user, this.pass)
      .expect([
        this.product
      ])
      .expect(200, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/products')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/products')
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('GET /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products/' + this.product.id)
      .auth(this.user, this.pass)
      .expect(200, this.product, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/products/1234')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('PUT /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    this.product.price += 1.00;

    supertest(this.app).put('/products/' + this.product.id)
      .auth(this.user, this.pass)
      .send(this.product)
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/' + this.product.id)
      .auth(this.user, this.pass)
      .send({
        name: '???'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/1234')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).put('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('DELETE /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).del('/products/' + this.product.id)
      .auth(this.user, this.pass)
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/products/1234')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});
