module.exports = function(app) {

	app.get('/', function(req, res, next) {
		if (!req.accepts('html')) return next();

		res.render('index');
	});

  app.get('/customers*', function(req, res, next) {
    if (!req.accepts('html')) return next();

    res.render('index');
  });

};
