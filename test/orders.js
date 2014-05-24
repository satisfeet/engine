var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /orders', function() {

  before(hooks.articles.create);
  before(hooks.customers.create);

  it('should respond with "Created"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
            quantity: 2,
            price: 0.01
          }
        ]
      })
      .expect(201, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: '123'
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: '123'
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: mongoose.mongo.ObjectID()
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
            quantity: 0
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
            quantity: -1
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
            quantity: 1.1
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
            quantity: 2
          }
        ]
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id,
        articles: [
          {
            article: this.article.id,
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
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.articles.remove);
  after(hooks.customers.remove);
  afterEach(hooks.orders.remove);

});

describe('GET /orders', function() {

  before(hooks.customers.create);
  before(hooks.articles.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders')
      .set('Authorization', this.token)
      .expect(200, [this.order], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/orders')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.orders.remove);
  after(hooks.articles.remove);
  after(hooks.customers.remove);

});

describe('GET /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.articles.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .expect(200, this.order, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/orders/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.orders.remove);
  after(hooks.articles.remove);
  after(hooks.customers.remove);

});

describe('PUT /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.articles.create);
  before(hooks.orders.create);

  it('should respond "No Content"', function(done) {
    this.order.state.shipped = new Date().toString();

    supertest(this.app).put('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .send(this.order)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    this.order.customer = '123456';

    supertest(this.app).put('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/orders/1234')
      .set('Authorization', this.token)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.orders.remove);
  after(hooks.articles.remove);
  after(hooks.customers.remove);

});

describe('DELETE /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.articles.create);
  before(hooks.orders.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/orders/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.orders.remove);
  after(hooks.articles.remove);
  after(hooks.customers.remove);

});

describe('OPTIONS /orders', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/orders')
      .expect(204, done);
  });

});
