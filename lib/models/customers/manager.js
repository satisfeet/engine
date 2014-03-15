var queries = require('./queries');

exports.find = function(options, callback) {
	var query = queries.select(options).toString();

	return this.query(query, callback);
};

exports.findOne = function(options, callback) {
	var query = queries.selectOne(options).toString();

	return this.query(query, function(err, result) {
		if (err) return callback(err);

		callback(null, result.pop());
	});
};

exports.create = function(document, callback) {
	var query = queries.insert(document).toString();

	var self = this;
	this.query(query, function(err, result) {
		if (err) return callback(err);

		self.findOne({ id: result.insertId }, callback);
	});
};

exports.destroy = function(document, callback) {
	var query = queries.delete(document).toString();

	return this.query(query, callback);
};
