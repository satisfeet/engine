module.exports = function(app) {

	app.use(function(req, res, next) {
		if (!req.accepts('json')) return next();

		res.send(404, {
			error: 'Not found.'
		});
	});

	app.use(function(err, req, res, next) {
		if (!req.accepts('json')) return next();

		if (err.fatal === true) {
			res.send(500, {
				error: 'Internal server error.',
				message: err.toString()
			});
		} else {
			res.send(400, {
				error: 'External client error.',
				message: err.toString()
			});
		}
	});

};
