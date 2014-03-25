var mongoose = require('mongoose');

module.exports = function(app) {

	var Supplier = mongoose.models.Supplier;

	app.post('/suppliers', function(req, res, next) {
		Supplier.create(req.body, function(err, result) {
			if (err) return next(err);

			res.json(200, result);
		});
	});

	app.get('/suppliers', function(req, res, next) {
		Supplier.findBy(req.query, function(err, result) {
			if (err) return next(err);

			res.json(200, result);
		});
	});

	app.all('/suppliers/:id', function(req, res, next) {
		Supplier.findOneBy(req.params, function(err, result) {
			if (err) return next(err);

			req.supplier = result;

			next();
		});
	});

	app.get('/suppliers/:id', function(req, res, next) {
		if (!req.supplier) return next();

		res.json(200, req.supplier);
	});

	app.put('/suppliers/:id', function(req, res, next) {
		if (!req.supplier) return next();

		req.supplier.set(req.body);
		req.supplier.save(function(err) {
			if (err) return next(err);

			res.json(200);
		});
	});

	app.del('/suppliers/:id', function(req, res, next) {
		if (!req.supplier) return next();

		req.supplier.remove(function(err) {
			if (err) return next();

			res.json(200);
		});
	});

};
