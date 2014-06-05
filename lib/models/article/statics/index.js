/**
 * Returns array of Articles matching criteria.
 *
 * @param {Object} criteria
 * @return {Array}
 */
exports.findBy = function* (criteria) {
  return yield this.find().exec();
};

/**
 * Returns Article matching criteria.
 *
 * @param {Object} criteria
 * @return {Article}
 */
exports.findOneBy = function* (criteria) {
  var query = this.findOne().where('_id', criteria.id);

  try {
    var result = yield query.exec();
  } catch(err) {
    return null;
  }

  return result;
};
