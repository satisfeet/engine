var lodash = require('lodash');

/**
 * Aggregates details accross referenced articles.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.details = function(value) {
  value = value || {};

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

  return value;
};
