var supertest = require('supertest');

var app = require('../../lib');

exports.setup = function(done) {
  this.app = app;

  this.username = app.security.username;
  this.password = app.security.password;

  this.db = app.context.db;

  this.Product  = app.context.Product;
  this.Customer = app.context.Customer;

  if (!this.server) this.server = app.listen();

  if (!this.token) {
    this.token = requestToken(this, done);
  } else {
    done();
  }
}

exports.order = require('./order');

exports.article = require('./article');

exports.product = require('./product');

exports.products = require('./product2');

exports.customers = require('./customer');

function requestToken(context, done) {
  supertest(context.server).post('/session')
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
