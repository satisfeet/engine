var lodash = require('lodash');

module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    var query = this.find();

    return query.exec();
  });

  schema.static('findOneBy', function(params) {
    return this.findOne({ _id: params.id }).exec();
  });

};
