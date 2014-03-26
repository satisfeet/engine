module.exports = function(app) {

  require('./customers')(app);

  require('./merchants')(app);

  require('./materials')(app);

  require('./products')(app);

  require('./supplies')(app);

  require('./orders')(app);

};
