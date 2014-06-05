var lodash    = require('lodash');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

describe('POST /products', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        iamge: {
          url: 'http://example.org/image.jpg'
        },
        types: [
          'clothing'
        ],
        details: {
          material: {
            cotton: 0.78,
            plastic: 0.22
          }
        },
        pricing: {
          retail: 2.99
        },
        description: 'These are the lovely socks for casual use.'
      })
      .expect(204, done);
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
        title: '?',
        types: [
          'clothing'
        ],
        pricing: {
          retail: 2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          retail: -2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: -2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {}
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: 2.99
        },
        variations: [
          'foobar'
        ]
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        pricing: {
          price: 2.99
        },
        variations: [
          { id: 'foobar' }
        ]
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/products')
      .set('Authorization', this.token)
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
      .set('Authorization', this.token)
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
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
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
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.product.remove);

});

describe('GET /products', function() {

  before(hooks.product.create);

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

  after(hooks.product.remove);

});

describe('GET /products/:id', function() {

  before(hooks.product.create);

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

  after(hooks.product.remove);

});

describe('PUT /products/:id', function() {

  before(hooks.product.create);

  it('should respond "No Content"', function(done) {
    this.product.price += 1.00;

    supertest(this.app).put('/products/' + this.product.id)
      .set('Authorization', this.token)
      .send(this.product)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/products/' + this.product.id)
      .set('Authorization', this.token)
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

  after(hooks.product.remove);

});

describe('DELETE /products/:id', function() {

  before(hooks.product.create);

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

  after(hooks.product.remove);

});

describe('OPTIONS /products', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/products')
      .expect(204, done);
  });

});
