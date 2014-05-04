var supertest = require('supertest');

var hooks = require('./hooks');

const ORIGIN      = 'http://manager.satisfeet.me';
const HEADERS     = 'Accept, Authorization';
const METHODS     = 'GET, HEAD, PUT, POST, DELETE';
const CREDENTIALS = 'true';

before(hooks.setup);

describe('GET /', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).get('/')
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect('Access-Control-Allow-Credentials', CREDENTIALS)
      .expect(204, done);
  });

  xit('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/')
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect('Access-Control-Allow-Credentials', CREDENTIALS)
      .expect(401, done);
  });

  it('should respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/')
      .accept('xml')
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect('Access-Control-Allow-Credentials', CREDENTIALS)
      .expect(406, done);
  });

});
