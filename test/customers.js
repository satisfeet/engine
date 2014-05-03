var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('POST /customers', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
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
      .expect(201, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .send({
        name: 'Walter??'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .send({
        name: 'Bodo Kaiser',
        email: 'bodokaiser@'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet_1'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Stre'
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet',
        address: {
          street: 'Geiserichstr. 3',
          city: 'Bo'
        }
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
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
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
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
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/customers')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).post('/customers')
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  afterEach(hooks.customers.remove);

});

describe('GET /customers', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        filter: {
          name: 'Bodo'
        }
      })
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        filter: {
          name: 'Joe Kaiser'
        }
      })
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        filter: {
          email: 'bodokaiser.io'
        }
      })
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        filter: {
          email: '@rockstar'
        }
      })
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        filter: {
          address: {
            city: 'Berlin'
          }
        }
      })
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        search: 'Bo'
      })
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .query({
        search: 'jQuery'
      })
      .expect(200, [], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/customers')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/customers')
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('GET /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/customers/' + this.customer.id)
      .auth(this.user, this.pass)
      .expect(200, this.customer, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).get('/customers/1234')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).get('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('PUT /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "No Content"', function(done) {
    this.customer.address.street = 'Potsdamer Platz 1';
    this.customer.address.zip = 12100;

    supertest(this.app).put('/customers/' + this.customer.id)
      .auth(this.user, this.pass)
      .send(this.customer)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/customers/' + this.customer.id)
      .auth(this.user, this.pass)
      .send({
        name: '!Chuba'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).put('/customers/1234')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).put('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).put('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('DELETE /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "No Content"', function(done) {
    supertest(this.app).del('/customers/' + this.customer.id)
      .auth(this.user, this.pass)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.app).del('/customers/123')
      .auth(this.user, this.pass)
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.app).del('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).del('/customers/' + mongoose.mongo.ObjectID())
      .auth(this.user, this.pass)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});
