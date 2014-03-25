module.exports = function(app, schema) {

  schema.index({ email: 1 }, { unique: true });

};
