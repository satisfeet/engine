var mongoose  = require('mongoose');
var supertest = require('supertest');

var hooks = require('../hooks');

before(hooks.setup);

describe('POST /customers', function() {

  it('should respond "Created"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
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
      .expect(201, {}, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
      .send({
        name: 'Walter??'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
      .send({
        name: 'Bodo Kaiser',
        email: 'bodokaiser@'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
      .send({
        name: 'Bodo Kaiser',
        email: 'i@bodokaiser.io',
        company: 'Satisfeet_1'
      })
      .expect(400, done);
  });

  it('should respond "Bad Request"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
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
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
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
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
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
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
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
    supertest(this.server).post('/customers')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).post('/customers')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  afterEach(hooks.customers.remove);

});

describe('GET /customers', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .expect([
        customer.toJSON()
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        filter: {
          name: 'Bodo'
        }
      })
      .expect([
        customer.toJSON()
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        filter: {
          name: 'Joe Kaiser'
        }
      })
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        filter: {
          email: 'bodokaiser.io'
        }
      })
      .expect([
        customer.toJSON()
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        filter: {
          email: '@rockstar'
        }
      })
      .expect(200, [], done);
  });

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        filter: {
          address: {
            city: 'Berlin'
          }
        }
      })
      .expect([
        customer.toJSON()
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        search: 'Bo'
      })
      .expect([
        customer.toJSON()
      ])
      .expect(200, done);
  });

  it('should respond "OK"', function(done) {
    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .query({
        search: 'jQuery'
      })
      .expect(200, [], done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/customers')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).get('/customers')
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('GET /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "OK"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).get('/customers/' + customer.id)
      .set('Authorization', this.token)
      .expect(200, customer.toJSON(), done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).get('/customers/1234')
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).get('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).get('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('PUT /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "No Content"', function(done) {
    var customer = new this.Customer(this.customer);

    customer.address.street = 'Potsdamer Platz 1';
    customer.address.zip = 12100;

    supertest(this.server).put('/customers/' + customer.id)
      .set('Authorization', this.token)
      .send(customer)
      .expect(204, done);
  });

  it('should respond "Bad Request"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).put('/customers/' + customer.id)
      .set('Authorization', this.token)
      .send({
        name: '!Chuba'
      })
      .expect(400, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).put('/customers/1234')
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).put('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).put('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('DELETE /customers/:id', function() {

  before(hooks.customers.create);

  it('should respond "No Content"', function(done) {
    var customer = new this.Customer(this.customer);

    supertest(this.server).del('/customers/' + customer.id)
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.server).get('/customers/1234')
      .expect(401, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).del('/customers/123')
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Found"', function(done) {
    supertest(this.server).del('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .expect(404, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.server).del('/customers/' + this.Customer.collection.id())
      .set('Authorization', this.token)
      .accept('xml')
      .expect(406, done);
  });

  after(hooks.customers.remove);

});

describe('OPTIONS /customers', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.server).options('/customers')
      .expect(204, done);
  });

});
