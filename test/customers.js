var chai      = require('chai');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('HTTP: customers', function() {

  var model = {};

  describe('POST /customers', function() {

    it('should respond "validation" error', function(done) {
      supertest(app).post('/customers')
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.name = 'Walter??';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.name = 'Bodo Kaiser';
      model.email = 'bodokaiser@';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.email = 'i@bodokaiser.io';
      model.company = 'Satisfeet_';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.company = 'Satisfeet';
      model.address = {
        street: 'Stre'
      };

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.address.street = 'Geiserichstr. 3';
      model.address.city = 'ab';

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.address.city = 'Berlin';
      model.address.zip = 12;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      model.address.city = 'Berlin';
      model.address.zip = 100000;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "model"', function(done) {
      model.address.zip = 12105;

      supertest(app).post('/customers')
        .send(model)
        .accept('json')
        .expect(200, function(err, res) {
          if (err) throw err;

          model = res.body;
          chai.expect(model).to.not.have.property('error');
          chai.expect(model).to.have.property('id');
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

    it('should respond "models"', function(done) {
      supertest(app).get('/customers')
        .accept('json')
        .expect(200, [model], done);
    });

    it('should respond "models" filtered by name', function(done) {
      supertest(app).get('/customers')
        .query({
          filter: {
            name: 'Bodo'
          }
        })
        .accept('json')
        .expect(200, [model], done);
    });

    it('should respond "models" filtered by name', function(done) {
      supertest(app).get('/customers')
        .query({
          filter: {
            name: 'Joe Kaiser'
          }
        })
        .accept('json')
        .expect(200, [], done);
    });

    it('should respond "models" filtered by email', function(done) {
      supertest(app).get('/customers')
        .query({
          filter: {
            email: 'bodokaiser.io'
          }
        })
        .accept('json')
        .expect(200, [model], done);
    });

    it('should respond "models" filtered by email', function(done) {
      supertest(app).get('/customers')
        .query({
          filter: {
            email: '@gmail'
          }
        })
        .accept('json')
        .expect(200, [], done);
    });

    xit('should respond "models" filtered by city', function(done) {
      supertest(app).get('/customers')
        .query({
          filter: {
            address: {
              city: 'Berlin'
            }
          }
        })
        .accept('json')
        .expect(200, [model], done);
    });

    it('should respond "models" filtered by search', function(done) {
      supertest(app).get('/customers')
        .query({
          search: 'Bo'
        })
        .accept('json')
        .expect(200, [model], done);
    });

    it('should respond "models" filtered by search', function(done) {
      supertest(app).get('/customers')
        .query({
          search: 'jQuery'
        })
        .accept('json')
        .expect(200, [], done);
    });

  });

  describe('GET /customers/:id', function() {

    it('should respond "not found" error', function(done) {
      supertest(app).get('/customers/123')
        .accept('json')
        .expect(404, done);
    });

    it('should respond "model" by id', function(done) {
      supertest(app).get('/customers/' + model.id)
        .accept('json')
        .expect(200, model, done);
    });

  });

  describe('PUT /customers/:id', function() {

  });

  describe('DELETE /customers/:id', function() {

    it('should respond "success"', function(done) {
      supertest(app).del('/customers/' + model.id)
        .accept('json')
        .expect(200, done);
    });

  });

});
