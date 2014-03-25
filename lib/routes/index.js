module.exports = function(app) {

	require('./articles')(app);

	require('./suppliers')(app);

  require('./customers')(app);

	require('./materials')(app);

};
