var queries = require('./queries');

exports.find = function* (criteria) {
  criteria = criteria || {};

  var query = {};

  queries.search(criteria.search, query);
  queries.filter(criteria.filter, query);

  var results = yield this.collection.find(query);

  return results.map(function(result) {
    return new this(result);
  }, this);
};

exports.findOne = function* (criteria) {
  var query = { _id: criteria.id };

  try {
    var result = yield this.collection.findOne(query);
  } catch(err) {
    return null;
  }

  return new this(result);
};
