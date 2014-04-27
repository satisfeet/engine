var thunkify = require('thunkify');

module.exports = function(app, schema) {

  schema.method('persist', function() {
    var model = this;

    return thunkify(model.save.bind(model));
  });

  schema.method('destroy', function() {
    var model = this;

    return thunkify(model.remove.bind(model));
  });

};
