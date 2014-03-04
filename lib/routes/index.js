module.exports = function(app) {

  require('./app')(app);

  require('./rest')(app);

};
