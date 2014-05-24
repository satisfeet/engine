var lodash   = require('lodash');
var mongoose = require('mongoose');

module.exports = function(app, schema) {

  var Variety = mongoose.models.Variety;

  schema.static('findBy', function(params) {
    var query = this.find();

    var result;

    return query.exec()
      .then(function(articles) {
        result = articles;

        return Variety.reduceBy();
      })
      .then(function(varieties) {
        result.forEach(function(article) {
          varieties.forEach(function(varieties) {
            if (article.id != varieties.article) return;

            lodash.merge(article.details, varieties.details);
          });
        });

        return result;
      });
  });

  schema.static('findOneBy', function(params) {
    var result;

    return this.findOne({ _id: params.id }).exec()
      .then(function(article) {
        if (!article) return;

        result = article;

        return Variety.reduceOneBy({ article: article.id });
      })
      .then(function(variety) {
        if (!result) return;
        if (!variety) return result;

        lodash.merge(result.details, variety.details);

        return result;
      });
  });

};
