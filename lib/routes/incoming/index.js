module.exports = function(app) {

  require('./merchants')(app);

  require('./materials')(app);

  require('./supplies')(app);

};
