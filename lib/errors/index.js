module.exports = function(app) {

	app.use(function(req, res, next) {
		if (!req.accepts('json')) return next();

		res.send(404, {
			error: 'Not found.'
		});
	});

	app.use(function(err, req, res, next) {
		if (!req.accepts('json')) return next();

    console.error(err.stack);

		if (err.fatal === true) {
			res.send(500, {
				error: 'Internal server error.'
			});
		} else {
			res.send(400, {
				error: 'External client error.'
			});
		}
	});

};