module.exports = function(app) {

  require('./customers')(app);

	app.get('*', function(req, res, next) {
		if (!req.accepts('html')) return next();
    if (req.path.indexOf('fonts') !== -1) return next();
    if (req.path.indexOf('images') !== -1) return next();
    if (req.path.indexOf('stylesheets') !== -1) return next();
    if (req.path.indexOf('javascripts') !== -1) return next();

		res.render('index');
	});

};
