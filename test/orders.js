var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /orders', function() {

  before(hooks.products.create);
  before(hooks.customers.create);

  it('should respond with "Created"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: 2,
            price: 0.01
          }
        ]
      })
      .accept('json')
      .expect(201, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: '123'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: '123'
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: mongoose.mongo.ObjectID()
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: 0
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: -1
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: 1.1
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: 2
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.user, this.pass)
      .send({
        customer: this.customer.id,
        products: [
          {
            product: this.product.id,
            quantity: 2,
            price: -0.01
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/orders')
      .accept('json')
      .expect(401, done);
  });

  after(hooks.products.remove);
  after(hooks.customers.remove);
  afterEach(hooks.orders.remove);

});

describe('GET /orders', function() {

  before(hooks.customers.create);
  before(hooks.products.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders')
      .auth(this.user, this.pass)
      .accept('json')
      .expect(200, [this.order], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders')
      .accept('json')
      .expect(401, done);
  });

  after(hooks.orders.remove);
  after(hooks.products.remove);
  after(hooks.customers.remove);

});

describe('GET /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.products.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders/' + this.order.id)
      .auth(this.user, this.pass)
      .accept('json')
      .expect(200, this.order, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/orders/1234')
      .auth(this.user, this.pass)
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .accept('json')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('json')
      .expect(404, done);
  });

  after(hooks.orders.remove);
  after(hooks.products.remove);
  after(hooks.customers.remove);

});

describe('PUT /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.products.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    this.order.state.shipped = new Date().toString();

    supertest(this.app).put('/orders/' + this.order.id)
      .auth(this.user, this.pass)
      .send(this.order)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    this.order.customer = '123456';

    supertest(this.app).put('/orders/' + this.order.id)
      .auth(this.user, this.pass)
      .send(this.order)
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/orders/1234')
      .auth(this.user, this.pass)
      .send(this.order)
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .accept('json')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('json')
      .expect(404, done);
  });

  after(hooks.orders.remove);
  after(hooks.products.remove);
  after(hooks.customers.remove);

});

describe('DELETE /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.products.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).del('/orders/' + this.order.id)
      .auth(this.user, this.pass)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/orders/1234')
      .auth(this.user, this.pass)
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/orders/1234')
      .accept('json')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('json')
      .expect(404, done);
  });

  after(hooks.orders.remove);
  after(hooks.products.remove);
  after(hooks.customers.remove);

});
