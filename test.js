var supertest = require('supertest');

supertest(require('./lib').listen())
  .post('/customers')
  .auth('bodokaiser', 'secret')
  .send({
    name: 'Pierce Brosnan',
    email: 'pierce@broccoli.uk',
    address: {
      city: 'London'
    }
  })
  .end(function(err, res) {
    if (err) throw err;

    console.log(res.status, res.body);
  });
