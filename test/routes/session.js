var chai      = require('chai');
var supertest = require('supertest');

const ORIGIN  = 'http://manager.satisfeet.me';
const HEADERS = 'Accept, Authorization, Content-Type';
const METHODS = 'GET, HEAD, PUT, POST, DELETE, OPTIONS';

var hooks = require('../hooks');

before(hooks.setup);

describe('GET /', function() {

  it('should respond "Created"', function(done) {
    supertest(this.app).get('/')
      .set('Authorization', this.token)
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect(204, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/')
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect(401, done);
  });

  it('sshould respond "Not Acceptable"', function(done) {
    supertest(this.app).get('/')
      .set('Authorization', this.token)
      .accept('xml')
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect(406, done);
  });

});

describe('OPTIONS /', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/')
      .expect(204, done);
  });

});

describe('GET /session', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).get('/session')
      .set('Authorization', this.token)
      .expect(204, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).get('/session')
      .expect(401, done);
  });

});

describe('POST /session', function() {

  it('should respond "OK"', function(done) {
    supertest(this.app).post('/session')
      .send({
        username: this.username,
        password: this.password
      })
      .expect(200, function(err, res) {
        if (err) return done(err);

        chai.expect(res.body).to.be.an('object')
          .and.to.have.property('token').that.is.a('string');

        done();
      });
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/session')
      .expect(401, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/session')
      .send({
        username: this.username
      })
      .expect(401, done);
  });

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).post('/session')
      .send({
        password: this.password
      })
      .expect(401, done);
  });

});

describe('DELETE /session', function() {

  it('should respond "Unauthorized"', function(done) {
    supertest(this.app).del('/session')
      .expect(401, done);
  });

  it('sshould respond "Method Not Allowed"', function(done) {
    supertest(this.app).del('/session')
      .set('Authorization', this.token)
      .expect(405, done);
  });

});

describe('OPTIONS /session', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/session')
      .expect(204, done);
  });

});
