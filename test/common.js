var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

describe('GET /', function() {

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/')
      .auth(this.user, this.pass)
      .expect('Access-Control-Allow-Origin', 'http://manager.satisfeet.me')
      .expect('Access-Control-Allow-Headers', 'accept,authorization')
      .expect('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,OPTIONS,DELETE')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect({
        status: true
      })
      .expect(200, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/')
      .expect('Access-Control-Allow-Origin', 'http://manager.satisfeet.me')
      .expect('Access-Control-Allow-Headers', 'accept,authorization')
      .expect('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,OPTIONS,DELETE')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/')
      .auth(this.user, this.pass)
      .accept('xml')
      .expect('Access-Control-Allow-Origin', 'http://manager.satisfeet.me')
      .expect('Access-Control-Allow-Headers', 'accept,authorization')
      .expect('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,OPTIONS,DELETE')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect(406, done);
  });

});
