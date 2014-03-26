var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app  = require('../../lib');
var auth = app.settings.account;
var model = require('../data/merchant');

describe('HTTP: merchants', function() {

  describe('POST /merchants', function() {

    it('should respond json', function(done) {
      supertest(app).post('/merchants')
        .send(model)
        .auth(auth.username, auth.password)
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) throw err;

          model.id = res.body.id;
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body).to.eql(model);

          done();
        });
    });

  });

  describe('GET /merchants', function() {

    it('should respond json', function(done) {
      supertest(app).get('/merchants')
        .auth(auth.username, auth.password)
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

  });

  describe('GET /merchants/:id', function() {

    it('should respond json', function(done) {
      supertest(app).get('/merchants/' + model.id)
        .auth(auth.username, auth.password)
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, model, done);
    });

  });

  describe('PUT /merchants/:id', function() {

    it('should respond json', function(done) {
      model.homepage += '/';

      supertest(app).put('/merchants/' + model.id)
        .send(model)
        .auth(auth.username, auth.password)
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

  describe('DELETE /merchants/:id', function() {

    it('should respond json', function(done) {
      supertest(app).del('/merchants/' + model.id)
        .auth(auth.username, auth.password)
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

});
