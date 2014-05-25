var mongoose = require('mongoose');

var Article = mongoose.models.Article;

exports.create = function(done) {
  this.article = new Article({
    details: {
      color: 'red',
      size: 44
    }
  });
  this.article.save(done);
  this.article = this.article.toJSON();
};

exports.remove = function(done) {
  Article.remove({}, done);
};
