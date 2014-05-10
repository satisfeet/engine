var chai      = require('chai');
var supertest = require('supertest');

var hooks = require('./hooks');

before(hooks.setup);

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
