var mongoose = require('mongoose');

module.exports = function(app) {

	var Order = mongoose.models.Order;

	app.get('/orders', function(req, res, next) {
		Order.findBy(req.query, function(err, result) {
			if (err) return next(err);

			res.json(200, result);
		});
	});

};
