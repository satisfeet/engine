var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

describe('POST /processes', function() {

  before(hooks.product.create);
  before(hooks.customer.create);

  it('should respond with "Created"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
      .expect(201, {}, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
      .send({
        customer: '123'
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
      .send({
        customer: mongoose.mongo.ObjectID()
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
      .send({
        customer: this.customer.id
      })
      .expect(400, done);
  });

  it('should respond with "Bad Request"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
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
    supertest(this.app).post('/processes')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/processes')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);
  after(hooks.customer.remove);
  afterEach(hooks.process.remove);

});

describe('GET /processes', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.process.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/processes')
      .set('Authorization', this.token)
      .expect(200, [this.process], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/processes')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/processes')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.process.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('GET /processes/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.process.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/processes/' + this.process.id)
      .set('Authorization', this.token)
      .expect(200, this.process, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/processes/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/processes/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.process.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('PUT /processes/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.process.create);

  it('should respond "No Content"', function(done) {
    this.process.state.shipped = new Date().toString();

    supertest(this.app).put('/processes/' + this.process.id)
      .set('Authorization', this.token)
      .send(this.process)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    this.process.customer = '123456';

    supertest(this.app).put('/processes/' + this.process.id)
      .set('Authorization', this.token)
      .send(this.process)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/processes/1234')
      .set('Authorization', this.token)
      .send(this.process)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/processes/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.process.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('DELETE /processes/:id', function() {

  before(hooks.customer.create);
  before(hooks.product.create);
  before(hooks.process.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/processes/' + this.process.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/processes/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/processes/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/processes/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.process.remove);
  after(hooks.product.remove);
  after(hooks.customer.remove);

});

describe('OPTIONS /processes', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/processes')
      .expect(204, done);
  });

});
