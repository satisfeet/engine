var mongoose = require('mongoose');

var Article = mongoose.models.Article;
var Product = mongoose.models.Product;

exports.create = function(done) {
  var self = this;

  this.article = new Article({
    product: this.product.id,
    details: {
      color: 'red',
      size: 44
    }
  });
  this.article.save(function(err) {
    if (err) return done(err);

    var query = { _id: self.product.id };
    var update = { $push: { articles: self.article.id } };

    Product.update(query, update, done);
  });
  this.article = this.article.toJSON();
};

exports.remove = function(done) {
  Article.remove({}, done);
};
