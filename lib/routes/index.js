module.exports = function(app) {

	require('./articles')(app);

  require('./customers')(app);

};
