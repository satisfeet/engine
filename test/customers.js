var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /customers', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Geiserichstr. 3',
          city: 'Berlin',
          zip: 12105
        }
      })
      .accept('json')
      .expect(201, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Walter??'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'bodokaiser@'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet_1'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Stre'
        }
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Geiserichstr. 3',
          city: 'Bo'
        }
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Geiserichstr. 3',
          city: 'Berlin',
          zip: 12
        }
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Geiserichstr. 3',
          city: 'Berlin',
          zip: 100000
        }
      })
      .accept('json')
      .expect(400, done);
  });

  afterEach(hooks.customers.remove);

});

describe('GET /customers', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        filter: {
          name: 'Bodo'
        }
      })
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        filter: {
          name: 'Joe Kaiser'
        }
      })
      .accept('json')
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        filter: {
          email: 'bodokaiser.io'
        }
      })
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        filter: {
          email: '@rockstar'
        }
      })
      .accept('json')
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        filter: {
          address: {
            city: 'Berlin'
          }
        }
      })
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        search: 'Bo'
      })
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .query({
        search: 'jQuery'
      })
      .accept('json')
      .expect(200, [], done);
  });

  after(hooks.customers.remove);

});

describe('GET /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers/' + this.customer.id)
      .accept('json')
      .expect(200, this.customer, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/customers/123')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/customers/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.customers.remove);

});

describe('PUT /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    this.customer.address.street = 'Potsdamer Platz 1';
    this.customer.address.zip = 12100;

    supertest(this.app).put('/customers/' + this.customer.id)
      .send(this.customer)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/customers/' + this.customer.id)
      .send({
        name: '!Chuba'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/customers/123')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/customers/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.customers.remove);

});

describe('DELETE /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).del('/customers/' + this.customer.id)
      .accept('json')
      .expect(200, done);
  });
  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/customers/123')
      .accept('json')
      .expect(400, done);
  });
  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/customers/' + mongoose.mongo.ObjectID())
      .accept('json')
      .expect(404, done);
  });

  after(hooks.customers.remove);

});
