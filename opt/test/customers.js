var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app   = require('../../lib');
var auth  = app.settings.account;
var model = require('../data/customer');

describe('HTTP: customers', function() {

  describe('POST /customers', function() {

    it('should respond json', function(done) {
      supertest(app).post('/customers')
				.send(model)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) throw err;

          model.id = res.body.id;

          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body.id).to.be.a('string');
          chai.expect(model).to.eql(res.body);

          done();
        });
    });

  });

  describe('GET /customers', function() {

    it('should respond json', function(done) {
      supertest(app).get('/customers')
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

    it('should respond json filtered by email', function(done) {
      supertest(app).get('/customers')
				.auth(auth.username, auth.password)
        .query({ filter: { email: '.io' } })
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

    it('should respond json filtered by street', function(done) {
			supertest(app).get('/customers')
				.auth(auth.username, auth.password)
        .query({ filter: { address: { street: '.io' } } })
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });

    it('should respond json searched by query', function(done) {
      supertest(app).get('/customers')
				.auth(auth.username, auth.password)
        .query({ search: 'Berl' })
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

  });

  describe('GET /customers/:id', function() {

    it('should respond json', function(done) {
      supertest(app).get('/customers/' + model.id)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, model, done);
    });

    it('should respond not found', function(done) {
      supertest(app).get('/customers/abc')
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

  });

  describe('PUT /customers/:id', function() {

    it('should respond json', function(done) {
      model.street = 'Geiserichstr.';

      supertest(app).put('/customers/' + model.id)
        .send(model)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond not found', function(done) {
      supertest(app).put('/customers/abc')
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });

  });

  describe('DELETE /customers/:id', function() {

    it('should respond OK', function(done) {
      supertest(app).del('/customers/' + model.id)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect(200, done);
    });

  });

});
