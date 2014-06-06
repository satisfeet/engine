var queries = require('./queries');

/**
 * Returns Array of Products matching criteria.
 *
 * @param {Object} criteria
 * @return {Array}
 */
exports.findBy = function* (criteria) {
  var query = this.find();

  return yield query.exec();
};

/**
 * Returns instance of Product matching criteria.
 *
 * @param {Object} criteria
 * @return {Product}
 */
exports.findOneBy = function* (criteria) {
  var query = this.findOne();

  queries.id(criteria.id, query);

  try {
    var result = yield query.exec();
  } catch(err) {
    return null;
  }

  return result;
};
