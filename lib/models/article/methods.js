module.exports = function(app, schema) {

  schema.method('merge', function(variety) {
    if (!variety || !variety._id) return this;
    if (this.id.toString() !== variety._id.toString()) return this;

    for (var key in variety.details) {
      this.details[key] = variety.details[key];
    }

    return this;
  });

};
