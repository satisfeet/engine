module.exports = function(app) {

  require('./merchant')(app);

  require('./material')(app);

  require('./supply')(app);

};
