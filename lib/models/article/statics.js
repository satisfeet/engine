var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params, callback) {
    var query = this.find().populate('materials');

    return query.exec(callback);
  });

};