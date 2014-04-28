var chai      = require('chai');
var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('HTTP: customers', function() {

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
      supertest(app).post('/customers')
        .send({
          name: 'Walter??'
        })
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      supertest(app).post('/customers')
        .send({
          name: 'Bodo Kaiser',
          email: 'bodokaiser@'
        })
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
      supertest(app).post('/customers')
        .send({
          name: 'Bodo Kaiser',
          email: 'i@bodokaiser.io',
          company: 'Satisfeet_1'
        })
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
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
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
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
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
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
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "validation" error', function(done) {
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
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "model"', function(done) {
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

    afterEach(function(done) {
      mongoose.models.Customer.remove({}, done);
    });

  });

  describe('GET /customers', function() {

    var models;

    before(function(done) {
      mongoose.models.Customer.create([
        {
          name: 'Bood Kaiser',
          email: 'i@bodokaiser.io',
          address: {
            street: 'Geiserichstr. 3',
            city: 'Berlin',
            zip: 12105
          }
        },
        {
          name: 'Carl Johnson',
          email: 'cj@rockstar.com'
        }
      ], function(err, result) {
        if (err) throw err;

        models = [].slice.call(arguments, 1).map(function(model) {
          return model.toJSON();
        });

        done();
      });
    });

    it('should respond "models"', function(done) {
      supertest(app).get('/customers')
        .accept('json')
        .expect(200, models, done);
    });

    it('should respond "models" filtered by name', function(done) {
      var result = models.filter(function(model) {
        return /Bodo/.test(model.name);
      });

      supertest(app).get('/customers')
        .query({
          filter: {
            name: 'Bodo'
          }
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by name', function(done) {
      var result = models.filter(function(model) {
        return /Joe Kaiser/.test(model.name);
      });

      supertest(app).get('/customers')
        .query({
          filter: {
            name: 'Joe Kaiser'
          }
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by email', function(done) {
      var result = models.filter(function(model) {
        return /bodokaiser.io/.test(model.email);
      });

      supertest(app).get('/customers')
        .query({
          filter: {
            email: 'bodokaiser.io'
          }
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by email', function(done) {
      var result = models.filter(function(model) {
        return /rockstar/.test(model.email);
      });

      supertest(app).get('/customers')
        .query({
          filter: {
            email: '@rockstar'
          }
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by city', function(done) {
      var result = models.filter(function(model) {
        if (!model.address) return false;

        return /Berlin/.test(model.address.city);
      });

      supertest(app).get('/customers')
        .query({
          filter: {
            address: {
              city: 'Berlin'
            }
          }
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by search', function(done) {
      var result = models.filter(function(model) {
        return /Bo/.test(model.name);
      });

      supertest(app).get('/customers')
        .query({
          search: 'Bo'
        })
        .accept('json')
        .expect(200, result, done);
    });

    it('should respond "models" filtered by search', function(done) {
      supertest(app).get('/customers')
        .query({
          search: 'jQuery'
        })
        .accept('json')
        .expect(200, [], done);
    });

    after(function(done) {
      mongoose.models.Customer.remove(models, done);
    });

  });

  describe('GET /customers/:id', function() {

    var model;

    before(function(done) {
      mongoose.models.Customer.create({
        name: 'Edison Trent',
        email: 'edison@freelancer.gov'
      }, function(err, result) {
        if (err) throw err;

        model = result.toJSON();

        done();
      });
    });

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

    after(function(done) {
      mongoose.models.Customer.remove({
        _id: model.id
      }, done);
    });

  });

  describe('PUT /customers/:id', function() {

    var model;

    before(function(done) {
      mongoose.models.Customer.create({
        name: 'Pizza Joe',
        email: 'info@pizza-joe.de'
      }, function(err, result) {
        if (err) throw err;

        model = result.toJSON();

        done();
      });
    });

    it('should respond "not found" error', function(done) {
      supertest(app).put('/customers/123')
        .accept('json')
        .expect(404, done);
    });

    it('should respond "validation" error', function(done) {
      supertest(app).put('/customers/' + model.id)
        .send({
          name: '!Chuba'
        })
        .accept('json')
        .expect({
          error: 'Validation failed'
        })
        .expect(400, done);
    });

    it('should respond "ok" success', function(done) {
      model.address = {
        street: 'Potsdamer Platz 1',
        city: 'Berlin',
        zip: 12002
      };

      supertest(app).put('/customers/' + model.id)
        .send(model)
        .accept('json')
        .expect(200, done);
    });

    after(function(done) {
      mongoose.models.Customer.remove({
        _id: model.id
      }, done);
    });

  });

  describe('DELETE /customers/:id', function() {

    var model;

    before(function(done) {
      mongoose.models.Customer.create({
        name: 'Edison Trent',
        email: 'edison@freelancer.gov'
      }, function(err, result) {
        if (err) throw err;

        model = result.toJSON();

        done();
      });
    });

    it('should respond "not found" error', function(done) {
      supertest(app).del('/customers/1234')
        .accept('json')
        .expect(404, done);
    });

    it('should respond "ok" success', function(done) {
      supertest(app).del('/customers/' + model.id)
        .accept('json')
        .expect(200, done);
    });

    after(function(done) {
      mongoose.models.Customer.remove({
        _id: model.id
      }, done);
    });

  });

});
