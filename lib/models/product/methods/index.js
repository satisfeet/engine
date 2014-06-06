var lodash = require('lodash');

/**
 * Aggregates variations accross referenced articles.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.aggregateVariations = function() {
  var value = {};

  lodash.forEach(this.articles, function(article) {
    lodash.forIn(article.variation, function(variation, key) {
      if (!lodash.isArray(value[key])) {
        value[key] = [];
      }
      if (!lodash.contains(value[key], variation)) {
        value[key].push(variation);
      }
    });
  });

  return value;
};
