module.exports = function(app) {

  app.use(require('./events'));

  app.use(require('./status'));

  app.use(require('./body'));

};
