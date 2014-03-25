module.exports = function(app) {

	app.use(function(req, res, next) {
		if (!req.accepts('json')) return next();

		res.json(404, {
			error: 'Not found.'
		});
	});

	app.use(function(err, req, res, next) {
		if (!req.accepts('json')) return next();
	
		console.error(err.stack);

		if (err.name === 'CastError') {
			res.json(404, {
				error: 'Not found.'
			});
		} else {
			res.send(400, {
        name: err.name,
        message: err.message
      });
		}
	});

};
