var mongoose = require('mongoose');

var Article = mongoose.models.Article;
var Variety = mongoose.models.Variety;

exports.create = function(done) {
  this.article = new Article({
    title: 'Casual Socks',
    types: [
      'clothing'
    ],
    details: {
      size: 42,
      color: 'red'
    },
    pricing: {
      retail: 2.99
    },
    variations: [
      new Variety({
        details: {
          size: '42-44',
          color: 'blue'
        }
      }),
      new Variety({
        details: {
          size: '42-44',
          color: 'black'
        }
      })
    ]
  });

  this.article.save(done);
  this.article = this.article.toJSON();
};

exports.remove = function(done) {
  Article.remove({}, done);
};
