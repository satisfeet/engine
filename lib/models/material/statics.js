var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params, callback) {
    var query = this.find().populate('supplier');

    return query.exec(callback);
  });

};
