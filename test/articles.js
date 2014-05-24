var lodash    = require('lodash');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /articles', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/articles')
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

  // TODO: mongoose currently does not support validation of the parent obj
  xit('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        image: {
          src: 'http://www.google.com'
        },
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
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        image: {
          url: 'htp://google.com'
        },
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
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [],
        pricing: {
          retail: 2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [2.99],
        pricing: {
          retail: 2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .send({
        title: 'Casual Socks',
        types: [
          'clothing'
        ],
        details: {},
        pricing: {
          retail: 2.99
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
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
    supertest(this.app).post('/articles')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/articles')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.articles.remove);

});

describe('GET /articles', function() {

  before(hooks.articles.create);
  before(hooks.varieties.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/articles')
      .set('Authorization', this.token)
      .expect([
        this.article
      ])
      .expect(200, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/articles')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/articles')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.varieties.remove);
  after(hooks.articles.remove);

});

describe('GET /articles/:id', function() {

  before(hooks.articles.create);
  before(hooks.varieties.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/articles/' + this.article.id)
      .set('Authorization', this.token)
      .expect(200, this.article, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/articles/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/articles/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.varieties.remove);
  after(hooks.articles.remove);

});

describe('PUT /articles/:id', function() {

  before(hooks.articles.create);

  it('should respond "No Content"', function(done) {
    this.article.price += 1.00;

    supertest(this.app).put('/articles/' + this.article.id)
      .set('Authorization', this.token)
      .send(this.article)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/articles/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/articles/' + this.article.id)
      .set('Authorization', this.token)
      .send({
        title: '???'
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).put('/articles/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.articles.remove);

});

describe('DELETE /articles/:id', function() {

  before(hooks.articles.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/articles/' + this.article.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/articles/1234')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/articles/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/articles/' + mongoose.mongo.ObjectID())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.articles.remove);

});

describe('OPTIONS /articles', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/articles')
      .expect(204, done);
  });

});
