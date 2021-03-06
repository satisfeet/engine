var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

describe('POST /orders', function() {

  before(hooks.product.create);
  before(hooks.customer.create);

  it('should respond with "Created"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: 2,
            price: 0.01
          }
        ]
      })
      .expect(200, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: '123'
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: '123'
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: mongoose.mongo.ObjectID()
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: 0
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: -1
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: 1.1
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: 2
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .send({
        customer: this.customer.id,
        items: [
          {
            product: this.product.id,
            quantity: 2,
            price: -0.01
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/orders')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/orders')
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);
  after(hooks.customer.remove);
  afterEach(hooks.order.remove);

});

describe('GET /orders', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.order.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders')
      .auth(this.username, this.password)
      .expect(200, [this.order], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/orders')
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('GET /orders/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.order.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders/' + this.order.id)
      .auth(this.username, this.password)
      .expect(200, this.order, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/orders/1234')
      .auth(this.username, this.password)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('PUT /orders/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.order.create);

  it('should respond "No Content"', function(done) {
    this.order.state.shipped = new Date().toString();

    supertest(this.app).put('/orders/' + this.order.id)
      .auth(this.username, this.password)
      .send(this.order)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    this.order.customer = '123456';

    supertest(this.app).put('/orders/' + this.order.id)
      .auth(this.username, this.password)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/orders/1234')
      .auth(this.username, this.password)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('DELETE /orders/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.order.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/orders/' + this.order.id)
      .auth(this.username, this.password)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/orders/1234')
      .auth(this.username, this.password)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/orders/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});
