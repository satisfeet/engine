var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app  = require('../../lib');
var auth = app.settings.account;
var model = require('../data/supplier');

describe('HTTP: suppliers', function() {

	describe('POST /suppliers', function() {

		it('should respond json', function(done) {
			supertest(app).post('/suppliers')
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

  describe('GET /suppliers', function() {

    it('should respond json', function(done) {
      supertest(app).get('/suppliers')
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, [model], done);
    });

  });

	describe('GET /suppliers/:id', function() {

    it('should respond json', function(done) {
      supertest(app).get('/suppliers/' + model.id)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, model, done);
    });

	});

	describe('PUT /suppliers/:id', function() {

    it('should respond json', function(done) {
			model.homepage += '/';

      supertest(app).put('/suppliers/' + model.id)
				.send(model)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

	});

	describe('DELETE /suppliers/:id', function() {

    it('should respond json', function(done) {
      supertest(app).del('/suppliers/' + model.id)
				.auth(auth.username, auth.password)
				.accept('application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

	});

});
