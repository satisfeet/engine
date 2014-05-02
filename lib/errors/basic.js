module.exports = function(context, error) {
  if (error.status !== 401) return;

  context.set('WWW-Authenticate', 'Basic');

  error.expose = false;
};
