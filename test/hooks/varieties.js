var lodash   = require('lodash');
var mongoose = require('mongoose');

var Variety = mongoose.models.Variety;

exports.create = function(done) {
  this.variety = new Variety({
    article: this.article.id,
    details: {
      size: 42,
      color: 'red'
    },
    pricing: {
      retail: 2.99
    }
  });

  this.article.details.size = [42];
  this.article.details.color = ['red'];
  this.variety.save(done);
  this.variety = this.variety.toJSON();
};

exports.remove = function(done) {
  Variety.remove({}, done);
};
