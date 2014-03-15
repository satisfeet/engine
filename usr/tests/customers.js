var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app = require('../../lib');

var customer = {
  surname: 'Kaiser',
  forename: 'Bodo',
  email: 'i@bodokaiser.io',
  street: 'Geiserichstraße',
  street_nr: '3',
  city: 'Berlin',
  zip: 12105
};

describe('HTTP: customers', function() {

  describe('POST /customers', function() {

    it('should respond json', function(done) {
      var raw = lodash.omit(customer, 'id');

      supertest(app).post('/customers').accept('json')
        .send(customer)
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) throw err;

          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body.id).to.be.a('number');

          customer.id = res.body.id;
          customer.company = null;

          chai.expect(customer).to.eql(res.body);

          done();
        });
    });

  });

  describe('GET /customers', function() {

    it('should respond json', function(done) {
      supertest(app).get('/customers').accept('json')
        .expect('Content-Type', /json/)
        .expect(200, [customer], done);
    });

    it('should respond json filtered by email', function(done) {
      supertest(app).get('/customers').accept('json')
        .query({ filter: { email: '.io' } })
        .expect('Content-Type', /json/)
        .expect(200, [customer], done);
    });

    it('should respond json filtered by street', function(done) {
      supertest(app).get('/customers').accept('json')
        .query({ filter: { street: '.io' } })
        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });

    it('should respond json searched by query', function(done) {
      supertest(app).get('/customers').accept('json')
        .query({ search: 'Berl' })
        .expect('Content-Type', /json/)
        .expect(200, [customer], done);
    });

  });

  describe('GET /customers/:id', function() {

    it('should respond json', function(done) {
      supertest(app).get('/customers/' + customer.id).accept('json')
        .expect('Content-Type', /json/)
        .expect(200, customer, done);
    });

    it('should respond not found', function(done) {
      supertest(app).get('/customers/abc').accept('json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

  });

  describe('PUT /customers/:id', function() {

    it('should respond json', function(done) {
      customer.street = 'Geiserichstr.';

      supertest(app).put('/customers/' + customer.id).accept('json')
        .send(customer)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond not found', function(done) {
      supertest(app).put('/customers/abc').accept('json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

    it('should respond client error', function(done) {
      supertest(app).put('/customers/' + customer.id).accept('json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

  });

  describe('DELETE /customers/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/customers/' + customer.id).accept('json')
        .expect(200, done);
    });

  });

});
