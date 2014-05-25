var jwt = require('koa-jwt');

module.exports = function(app) {

  var options = app.security;

  app.get('/session', function *(next) {
    this.status = 204;
  });

  app.post('/session', function *(next) {
    if (!this.request.body) this.throw(401);

    if (this.request.body.username !== options.username) this.throw(401);
    if (this.request.body.password !== options.password) this.throw(401);

    this.body = {
      token: createToken(this)
    };
  });

  app.del('/session', function *(next) {
    this.throw(405);
  });

};

function createToken(context) {
  var options = context.app.security;

  var profile = {
    username: context.request.body.username
  };

  return jwt.sign(profile, options.secret, options);
}
