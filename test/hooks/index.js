var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../../lib');

exports.setup = function(done) {
  this.username = app.security.username;
  this.password = app.security.password;

  if (!this.app) this.app = app.listen();

  this.Product  = mongoose.models.Product;
  this.Customer = mongoose.models.Customer;

  if (!this.token) {
    this.token = requestToken(this, done);
  } else {
    done();
  }
}

exports.order = require('./order');

exports.article = require('./article');

exports.product = require('./product');

exports.customer = require('./customer');

function requestToken(context, done) {
  supertest(context.app).post('/session')
    .send({
      username: context.username,
      password: context.password
    })
    .expect(200, function(err, res) {
      if (err) return done;

      context.token = 'Bearer ' + res.body.token;

      done();
    });
}
