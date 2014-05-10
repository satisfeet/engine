var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /products', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        name: 'Casual Socks',
        price: 2.99
      })
      .expect(201, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        name: '?'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        name: 'Casual Socks'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        name: 'Casual Socks',
        price: 100000
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
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
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('GET /products', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products')
      .set('Authorization', this.token)
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
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('GET /products/:id', function() {

  before(hooks.products.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products/' + this.product.id)
      .set('Authorization', this.token)
      .expect(200, this.product, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/products/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('PUT /products/:id', function() {

  before(hooks.products.create);

  it('should respond "No Content"', function(done) {
    this.product.price += 1.00;

    supertest(this.app).put('/products/' + this.product.id)
      .set('Authorization', this.token)
      .send(this.product)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/' + this.product.id)
      .set('Authorization', this.token)
      .send({
        name: '???'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).put('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('DELETE /products/:id', function() {

  before(hooks.products.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/products/' + this.product.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/products/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.products.remove);

});

describe('OPTIONS /products', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/products')
      .expect(204, done);
  });

});
