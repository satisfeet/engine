var mongoose = require('mongoose');

module.exports = function(app) {

	var Supplier = mongoose.models.Supplier;

	app.get('/suppliers', function(req, res, next) {
		Supplier.findBy(req.query, function(err, result) {
			if (err) return next(err);

			res.json(200, result);
		});
	});

};
