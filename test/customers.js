var chai      = require('chai');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('POST /customers', function() {

  it('should respond "Created"', function(done) {
    supertest(app).post('/customers')
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
    supertest(app).post('/customers')
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/customers')
      .send({
        name: 'Walter??'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'bodokaiser@'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/customers')
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet_1'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).post('/customers')
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
    supertest(app).post('/customers')
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
    supertest(app).post('/customers')
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
    supertest(app).post('/customers')
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

  afterEach(cleanup);

});

describe('GET /customers', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    supertest(app).get('/customers')
      .accept('json')
      .expect([
        this.customer
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(app).get('/customers')
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
    supertest(app).get('/customers')
      .query({
        filter: {
          name: 'Joe Kaiser'
        }
      })
      .accept('json')
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(app).get('/customers')
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
    supertest(app).get('/customers')
      .query({
        filter: {
          email: '@rockstar'
        }
      })
      .accept('json')
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    supertest(app).get('/customers')
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
    supertest(app).get('/customers')
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
    supertest(app).get('/customers')
      .query({
        search: 'jQuery'
      })
      .accept('json')
      .expect(200, [], done);
  });

  after(cleanup);

});

describe('GET /customers/:id', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    supertest(app).get('/customers/' + this.customer.id)
      .accept('json')
      .expect(200, this.customer, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(app).get('/customers/123')
      .accept('json')
      .expect(404, done);
  });

  after(cleanup);

});

describe('PUT /customers/:id', function() {

  before(setup);

  it('should respond "OK"', function(done) {
    this.customer.address.street = 'Potsdamer Platz 1';
    this.customer.address.zip = 12100;

    supertest(app).put('/customers/' + this.customer.id)
      .send(this.customer)
      .accept('json')
      .expect(200, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(app).put('/customers/' + this.customer.id)
      .send({
        name: '!Chuba'
      })
      .accept('json')
      .expect(400, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(app).put('/customers/123')
      .accept('json')
      .expect(404, done);
  });

  after(cleanup);

});

describe('DELETE /customers/:id', function() {

  before(setup);

  it('should respond "Not Found"', function(done) {
    supertest(app).del('/customers/1234')
      .accept('json')
      .expect(404, done);
  });

  it('should respond "OK"', function(done) {
    supertest(app).del('/customers/' + this.customer.id)
      .accept('json')
      .expect(200, done);
  });

  after(cleanup);

});

function setup(done) {
  this.customer = new mongoose.models.Customer({
    name: 'Bodo Kaiser',
    email: 'i@bodokaiser.io',
    address: {
      street: 'Geiserichstr. 3',
      city: 'Berlin',
      zip: 12105
    }
  });
  this.customer.save(done);
  this.customer = this.customer.toJSON();
}

function cleanup(done) {
  mongoose.models.Customer.remove({}, done);
}
