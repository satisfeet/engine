var element = document.getElementById('content');

module.exports = function(app) {

  app('*', function(context, next) {
    context.element = element;

    next();
  });

};
