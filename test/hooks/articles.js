var mongoose = require('mongoose');

var Article = mongoose.models.Article;

exports.create = function(done) {
  this.article = new Article({
    title: 'Casual Socks',
    types: [
      'clothing'
    ],
    details: {
      material: {
        cotton: 0.87
      }
    },
    pricing: {
      retail: 2.99
    }
  });

  this.article.save(done);
  this.article = this.article.toJSON();
};

exports.remove = function(done) {
  Article.remove({}, done);
};
