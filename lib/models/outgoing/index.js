module.exports = function(app) {

  require('./customer')(app);

  require('./product')(app);

  require('./order')(app);

};
