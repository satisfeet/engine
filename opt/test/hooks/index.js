var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../../../lib');

exports.setup = function() {
  this.username = app.auth.username;
  this.password = app.auth.password;

  if (!this.app) this.app = app.listen();

  this.Order    = mongoose.models.Order;
  this.Product  = mongoose.models.Product;
  this.Customer = mongoose.models.Customer;
}

exports.order    = require('./order');
exports.product  = require('./product');
exports.customer = require('./customer');
