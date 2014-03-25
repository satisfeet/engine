var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params, callback) {
    var query = this.find();

    if (lodash.isString(params.search)) {
      search(query, params.search, schema);
    }
    if (lodash.isPlainObject(params.filter)) {
      filter(query, params.filter);
    }

    return query.exec(callback);
  });

};
