var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app  = require('../../lib');
var auth = app.settings.account;
var model = require('../data/material');

xdescribe('HTTP: materials', function() {

  describe('POST /materials', function() {

    it('should respond json', function(done) {
      supertest(app).post('/materials')
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

  describe('GET /materials', function() {

    it('should respond json', function(done) {
      supertest(app).get('/materials')
        .auth(auth.username, auth.password)
        .query({ include: true })
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

  });

  describe('GET /materials/:id', function() {

    it('should respond json', function(done) {
      supertest(app).get('/materials/' + model.id)
        .auth(auth.username, auth.password)
        .query({ include: true })
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, model, done);
    });

  });

  describe('PUT /materials/:id', function() {

    it('should respond json', function(done) {
      model.categories.push('product');

      supertest(app).put('/materials/' + model.id)
        .send(model)
        .auth(auth.username, auth.password)
        .query({ include: true })
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

  describe('DELETE /materials/:id', function() {

    it('should respond json', function(done) {
      supertest(app).del('/materials/' + model.id)
        .auth(auth.username, auth.password)
        .query({ include: true })
        .accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

});
