module.exports = function(context, error) {
  if (error.status === 401) {
    context.set('WWW-Authenticate', 'Basic');

    error.expose = false;
  }
};
