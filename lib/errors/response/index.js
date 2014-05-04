module.exports = function(app) {

  app.use(require('./events'));

  app.use(require('./body'));

  app.use(require('./status'));

};
