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

    // TODO: full-text search
    // TODO: filter by parameter

  });

  describe('GET /customers/:id', function() {

  });

  describe('PUT /customers/:id', function() {

  });

  describe('DELETE /customers/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/customers/' + customer.id).accept('json')
        .expect(200, done);
    });

  });

});
