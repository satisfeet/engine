var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

xdescribe('POST /orders', function() {

  before(hooks.product.create);
  before(hooks.article.create);
  before(hooks.customers.create);

  it('should respond with "Created"', function(done) {
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.server).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: '123'
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.server).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.server).post('/orders')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
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
    supertest(this.server).post('/orders')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).post('/orders')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);
  after(hooks.article.remove);
  after(hooks.customers.remove);
  afterEach(hooks.order.remove);

});

xdescribe('GET /orders', function() {

  before(hooks.customers.create);
  before(hooks.product.create);
  before(hooks.article.create);
  before(hooks.order.create);

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/orders')
      .set('Authorization', this.token)
      .expect(200, [this.order], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/orders')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).get('/orders')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.article.remove);
  after(hooks.product.remove);
  after(hooks.customers.remove);

});

xdescribe('GET /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.product.create);
  before(hooks.article.create);
  before(hooks.order.create);

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .expect(200, this.order, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).get('/orders/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).get('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).get('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.article.remove);
  after(hooks.product.remove);
  after(hooks.customers.remove);

});

xdescribe('PUT /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.product.create);
  before(hooks.article.create);
  before(hooks.order.create);

  it('should respond "No Content"', function(done) {
    this.order.state.shipped = new Date().toString();

    supertest(this.server).put('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .send(this.order)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    this.order.customer = '123456';

    supertest(this.server).put('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).put('/orders/1234')
      .set('Authorization', this.token)
      .send(this.order)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).put('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).put('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.article.remove);
  after(hooks.product.remove);
  after(hooks.customers.remove);

});

xdescribe('DELETE /orders/:id', function() {

  before(hooks.customers.create);
  before(hooks.product.create);
  before(hooks.article.create);
  before(hooks.order.create);

  it('should respond "No Content"', function(done) {
    supertest(this.server).del('/orders/' + this.order.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).del('/orders/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).del('/orders/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).del('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).del('/orders/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.order.remove);
  after(hooks.article.remove);
  after(hooks.product.remove);
  after(hooks.customers.remove);

});

xdescribe('OPTIONS /orders', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.server).options('/orders')
      .expect(204, done);
  });

});
