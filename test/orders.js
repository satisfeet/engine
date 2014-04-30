var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../lib').listen();

describe('POST /orders', function() {

  it('should respond with "Bad Request"', function(done) {
    supertest(app).post('/orders')
      .accept('json')
      .expect(400, done);
  });

  xit('should respond with "Bad Request"', function(done) {
    supertest(app).post('/orders')
      .send({
        customer: '123'
      })
      .accept('json')
      .expect(400, done);
  });

  afterEach(clear);

});

function clear(done) {
  mongoose.models.Order.remove({}, done);
}
