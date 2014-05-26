var lodash = require('lodash');

module.exports = function(schema) {

  schema.path('title').set(function(value) {
    return value.trim();
  });

  schema.path('details').get(function(details) {
    details = details || {};

    lodash.forEach(this.articles, function(article) {
      lodash.forIn(article.details, function(detail, key) {
        if (!lodash.isArray(details[key])) {
          details[key] = [];
        }
        if (!lodash.contains(details[key], detail)) {
          details[key].push(detail);
        }
      });
    });

    return details;
  });

  schema.path('articles').get(function(articles) {
    console.log('articles');

    return lodash.map(articles, function(article) {
      return article.id;
    });
  });

  schema.path('pricing.retail').set(function(value) {
    return +value.toFixed(2);
  });

};
