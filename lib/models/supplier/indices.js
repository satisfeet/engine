module.exports = function(app, schema) {

	schema.index({ name: 1 }, { unique: true });

};
