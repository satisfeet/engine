var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params, callback) {
    var query = this.find().populate('supplier').populate('materials.material');

    return query.exec(callback);
  });

};
