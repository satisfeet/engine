var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    var query = this.find();

    filter(query, params.filter);

    return query.exec();
  });

  schema.static('findOneBy', function(params) {
    return this.findOne({ _id: params.id }).exec();
  });

};

function filter(query, param) {
  lodash.forIn(param, function transform(value, key) {
    if (lodash.isString(value)) {
      query.regex(key, new RegExp(value));
    }
  });
}
