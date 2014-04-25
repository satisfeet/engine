var is = require('is-type');

exports.findBy = function(schema) {
  schema.statics.findBy = function(params, callback) {
    var query = this.find();

    if (is.string(params.search)) {
      search(query, params.search, schema);
    }
    if (is.object(params.filter)) {
      filter(query, params.filter);
    }

    return query.exec(callback);
  };
};

exports.findOneBy = function(schema) {
  schema.statics.findOneBy = function(params, callback) {
    var query = this.findOne();

    if (params.id && params.id.length === 24) {
      query.where('_id', params.id);
    } else {
      return callback();
    }

    return query.exec(callback);
  };
};

function filter(query, param) {
  for (var key in param) {
    var value = param[key];

    if (is.object(value)) {
      filter(query, value);
    }
    if (is.string(value)) {
      query.regex(key, new RegExp(value));
    }
  }
}

function search(query, param, schema) {
  for (var key in param) {
    var value = param[key];

    if (value.instance === 'String') {
      var or = {};

      or[key] = { $regex: new RegExp(param) };
      query.or(or);
    }
  }
}
