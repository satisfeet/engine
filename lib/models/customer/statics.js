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

  schema.static('findOneBy', function(params, callback) {
    return this.findById(params.id, callback);
  });

};

function filter(query, param) {
  lodash.forIn(param, function(value, key) {
    if (lodash.isPlainObject(value)) {
      filter(query, value);
    }
    if (lodash.isString(value)) {
      query.regex(key, new RegExp(value));
    }
  });
}

function search(query, param, schema) {
  lodash.forIn(schema.paths, function(value, key) {
    if (value.instance === 'String') {
      var or = {};

      or[key] = { $regex: new RegExp(value) };

      query.or(or);
    }
  });
}
