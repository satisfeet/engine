var chai      = require('chai');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('HTTP: customers', function() {

  var model = {};

  describe('POST /customers', function() {

    it('should respond error', function(done) {
      supertest(app).post('/customers')
        .accept('json')
        .expect({
          error: 'value contains an invalid value'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.name = 'W??';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'name fails to match the required pattern'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.name = 'Bodo Kaiser';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'email is required'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.email = 'bodokaiser@';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'email must be a valid email'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.email = 'i@bodokaiser.io';
      model.company = 'ABC';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'company length must be at least 4 characters long'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.email = 'i@bodokaiser.io';
      model.company = 'Satisfeet_';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'company fails to match the required pattern'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.address = {};
      delete model.company;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'street is required'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.address.street = 'Stre';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'street length must be at least 5 characters long'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.address.street = 'Geiserichstr. 3';
      model.address.city = 'ab';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'city length must be at least 4 characters long'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.address.city = 'Berlin';
      model.address.zip = 12;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'zip must be larger than or equal to 10000'
        })
        .expect(400, done);
    });

    it('should respond error', function(done) {
      model.address.city = 'Berlin';
      model.address.zip = 100000;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'zip must be less than or equal to 99999'
        })
        .expect(400, done);
    });

    it('should respond model', function(done) {
      model.address.zip = 12105;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          model = res.body;

          chai.expect(model).to.have.property('_id');
          chai.expect(model).to.have.property('name', 'Bodo Kaiser');
          chai.expect(model).to.have.property('email', 'i@bodokaiser.io');
          chai.expect(model.address).to.have.property('street', 'Geiserichstr. 3');
          chai.expect(model.address).to.have.property('city', 'Berlin');
          chai.expect(model.address).to.have.property('zip', 12105);

          done();
        });
    });

  });

  describe('GET /customers', function() {

  });

  describe('GET /customers/:param', function() {

  });

  describe('PUT /customers/:param', function() {

  });

  describe('DELETE /customers/:param', function() {

    it('should respond success', function(done) {
      supertest(app).del('/customers/' + model._id)
        .accept('json')
        .expect(200, done);
    });

  });

});
