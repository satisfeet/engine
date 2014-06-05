var queries = require('./queries');

/**
 * Returns array of Customers matching criteria.
 *
 * @param {Object} criteria
 * @return {Array}
 */
exports.findBy = function* (criteria) {
  var query = this.find();

  queries.search(criteria.search, query);
  queries.filter(criteria.filter, query);

  var result = yield query.exec();

  return result;
};

/**
 * Returns instance of Customer matching criteria.
 *
 * @param {Object} criteria
 * @return {Customer}
 */
exports.findOneBy = function* (criteria) {
  var query = this.findOne();

  queries.id(criteria.id, query);

  try {
    var result = yield query.exec();
  } catch(error) {
    return null;
  }

  return result;
};
