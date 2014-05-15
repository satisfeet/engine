var supertest = require('supertest');

var hooks = require('./hooks');

const ORIGIN  = 'http://manager.satisfeet.me';
const HEADERS = 'Accept, Authorization, Content-Type';
const METHODS = 'GET, HEAD, PUT, POST, DELETE, OPTIONS';

before(hooks.setup);

describe('GET /', function() {

  before(hooks.customers.create);
  before(hooks.products.create);
  before(hooks.orders.create);

  it('should respond "OK"', function(done) {
    supertest(this.app).get('/')
      .set('Authorization', this.token)
      .expect('Access-Control-Allow-Origin', ORIGIN)
      .expect('Access-Control-Allow-Headers', HEADERS)
      .expect('Access-Control-Allow-Methods', METHODS)
      .expect({
        orders: 1,
        products: 1,
        customers: 1
      })
      .expect(200, done);
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

  after(hooks.orders.remove);
  after(hooks.products.remove);
  after(hooks.customers.remove);

});

describe('OPTIONS /', function() {

  it('should respond "No Content"', function(done) {
    supertest(this.app).options('/')
      .expect(204, done);
  });

});
