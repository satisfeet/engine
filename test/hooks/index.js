var mongoose  = require('mongoose');
var supertest = require('supertest');

var app = require('../../lib');

var Order = mongoose.models.Order;
var Article = mongoose.models.Article;
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
      articles: [
        {
          article: this.article.id,
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

exports.articles = {
  create: function(done) {
    this.article = new mongoose.models.Article({
      title: 'Casual Socks',
      details: {
        size: 42,
        color: 'red'
      },
      pricing: {
        retail: 2.99
      },
      types: [
        'clothing'
      ]
    });
    this.article.save(done);
    this.article = this.article.toJSON();
  },
  remove: function(done) {
    Article.remove({}, done);
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