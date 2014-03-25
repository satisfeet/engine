var chai      = require('chai');
var lodash    = require('lodash');
var supertest = require('supertest');

var app  = require('../../lib');
var auth = app.settings.account;

describe('HTTP: articles', function() {

  describe('GET /articles', function() {

    it('should respond json', function(done) {
      supertest(app).get('/articles').accept('json')
				.auth(auth.username, auth.password)
        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });

  });

});
