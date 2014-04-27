var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    var query = this.find();

    if (lodash.isString(params.search)) {
      search(query, params.search, schema);
    }
    if (lodash.isPlainObject(params.filter)) {
      filter(query, params.filter);
    }

    return query.exec();
  });

  schema.static('findOneBy', function(params) {
    var query = this.findOne().where('_id', params.id);

    return query.exec();
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

      or[key] = { $regex: new RegExp(param) };

      query.or(or);
    }
  });
}
