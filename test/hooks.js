var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../lib');

var Order = mongoose.models.Order;
var Product = mongoose.models.Product;
var Customer = mongoose.models.Customer;

exports.setup = function(done) {
  this.username = app.security.username;
  this.password = app.security.password;

  if (!this.app) {
    this.app = app.listen();
  }

  if (!this.token) {
    this.token = requestToken(this, done);
  } else {
    done();
  }
}

exports.orders = {
  create: function(done) {
    this.order = new mongoose.models.Order({
      customer: this.customer.id,
      products: [
        {
          product: this.product.id,
          quantity: 2,
          price: 1.99
        }
      ]
    });
    this.order.save(done);
    this.order = this.order.toJSON();
  },
  remove: function(done) {
    Order.remove({}, done);
  }
};

exports.products = {
  create: function(done) {
    this.product = new mongoose.models.Product({
      name: 'Casual Socks',
      price: 2.99
    });
    this.product.save(done);
    this.product = this.product.toJSON();
  },
  remove: function(done) {
    Product.remove({}, done);
  }
};

exports.customers = {
  create: function(done) {
    this.customer = new mongoose.models.Customer({
      name: 'Bodo Kaiser',
      email: 'i@bodokaiser.io',
      address: {
        street: 'Geiserichstr. 3',
        city: 'Berlin',
        zip: 12105
      }
    });
    this.customer.save(done);
    this.customer = this.customer.toJSON();
  },
  remove: function(done) {
    Customer.remove({}, done);
  }
};

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