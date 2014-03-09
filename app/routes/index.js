var template = require('../templates/main');

module.exports = function(app) {

  app('/', function(context, next) {
    context.element.innerHTML = template();
  });

  require('./customers')(app);

};
