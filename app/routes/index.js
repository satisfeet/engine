var template = require('../views/main/landing');

module.exports = function(app) {

  app('/', function(context, next) {
    context.element.innerHTML = template();
  });

  require('./customers')(app);

};
