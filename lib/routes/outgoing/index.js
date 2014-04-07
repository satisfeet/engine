module.exports = function(app) {

  require('./customers')(app);

  require('./products')(app);

  require('./orders')(app);

};
