module.exports = function(app) {

  require('./customers')(app);

  require('./suppliers')(app);

  require('./materials')(app);

  require('./deliveries')(app);

  require('./articles')(app);

  require('./orders')(app);

};
