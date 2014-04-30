var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /orders', function() {

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .send({
        customer: '123'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .send({
        customer: mongoose.mongo.ObjectID(),
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
      .send({
        customer: mongoose.mongo.ObjectID(),
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
      .send({
        customer: mongoose.mongo.ObjectID(),
        products: [
          {
            product: mongoose.mongo.ObjectID(),
            quantity: 3
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .send({
        customer: mongoose.mongo.ObjectID(),
        products: [
          {
            product: mongoose.mongo.ObjectID(),
            quantity: 3,
            price: 0.00
          }
        ]
      })
      .accept('json')
      .expect(400, done);
  });

  after(hooks.orders.remove);

});
