module.exports = function(app) {

  app.use(function(req, res, next) {
    if (!req.accepts('json')) return next();

    res.json(404, {
      error: 'Not found.'
    });
  });

  app.use(function(err, req, res, next) {
    if (!req.accepts('json')) return next();

    if (err.name !== 'CastError') {
      console.log(err.stack);
    }

    next(err);
  });

};
