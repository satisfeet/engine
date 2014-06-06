module.exports = function(schema) {

  schema.method('persist', function(body) {
    var model = this;

    return function(callback) {
      model.set(body);
      model.save(callback);
    }
  });

  schema.method('destroy', function() {
    var model = this;

    return function(callback) {
      model.remove(callback);
    }
  });

};
