var lodash = require('lodash');

/**
 * Aggregates variations accross referenced articles.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.derive = function(attribute) {
  var value = {};

  lodash.forEach(this.derivates, function(derivate) {
    lodash.forIn(derivate[attribute], function(derive, key) {
      if (!lodash.isArray(value[key])) {
        value[key] = [];
      }
      if (!lodash.contains(value[key], derive)) {
        value[key].push(derive);
      }
    });
  });

  return value;
};
