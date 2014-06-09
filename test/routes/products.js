var lodash    = require('lodash');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

describe('POST /products', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: 'http://satisfeet.me/images/casual.jpg'
        },
        details: {
          material: {
            cotton: 0.78,
            plastic: 0.22
          }
        },
        pricing: {
          retail: 2.99
        },
        description: 'foobar foobar foobar foobar foobar foobar blalbalblabla'
      })
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: '?',
        image: {
          url: 'http://satisfeet.me/images/casual.jpg'
        },
        pricing: {
          retail: 2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: 'http://satisfeet.me/images/casual.jpg'
        },
        pricing: {
          retail: -2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: null
        },
        pricing: {
          price: -2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: 'http://satisfeet.me/images/casual.jpg'
        },
        pricing: {}
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: 'http://satisfeet.me/images/casual.jpg'
        },
        pricing: {
          price: 2.99
        },
        derivates: [
          { foo: 'bar' }
        ]
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: 2.99
        },
        derivates: [
          { variations: null }
        ]
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: 2.99
        },
        description: ''
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: 2.99
        },
        description: '?????Ö'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .send({
        title: 'Casual Socks',
        image: {
          url: '/images/casual.jpg'
        },
        pricing: {
          price: 2.99
        },
        description: 'Hello these are great socks!'
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/products')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/products')
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('GET /products', function() {

  before(hooks.product.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products')
      .auth(this.username, this.password)
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
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('GET /products/:id', function() {

  before(hooks.product.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/products/' + this.product.id)
      .auth(this.username, this.password)
      .expect(200, this.product, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/products/1234')
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('PUT /products/:id', function() {

  before(hooks.product.create);

  it('should respond "No Content"', function(done) {
    this.product.price += 1.00;

    supertest(this.app).put('/products/' + this.product.id)
      .auth(this.username, this.password)
      .send(this.product)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/' + this.product.id)
      .auth(this.username, this.password)
      .send({
        title: '???'
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).put('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/products/1234')
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('DELETE /products/:id', function() {

  before(hooks.product.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/products/' + this.product.id)
      .auth(this.username, this.password)
      .expect(204, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/products/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/products/1234')
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/products/' + mongoose.mongo.ObjectID())
      .auth(this.username, this.password)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('OPTIONS /products', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/products')
      .expect(204, done);
  });

});
