var queries = require('./queries');

exports.find = function(options, callback) {
	var query = queries.select(options);

	return this.query(query, callback);
};

exports.findOne = function(options, callback) {
	var query = queries.selectOne(options);

	return this.query(query, function(err, result) {
		if (err) return callback(err);

		callback(null, result.pop());
	});
};

exports.create = function(document, callback) {
	var query = queries.insert(document);

	var self = this;
	this.query(query, function(err, result) {
		if (err) return callback(err);

		self.findOne({ id: result.insertId }, callback);
	});
};

exports.destroy = function(document, callback) {
	var query = queries.delete(document);

	return this.query(query, callback);
};
