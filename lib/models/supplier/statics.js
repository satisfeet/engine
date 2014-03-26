var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params, callback) {
    var query = this.find();

    return query.exec(callback);
  });

  schema.static('findOneBy', function(params, callback) {
    var query = this.findOne();

    if (params.id && params.id.length === 24) {
      query.where('_id', params.id);
    } else {
      return callback();
    }

    return query.exec(callback);
  });

};
