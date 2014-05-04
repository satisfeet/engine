var jwt = require('koa-jwt');

module.exports = function(app) {

  app.post('/session', function *(next) {
    var account = this.app.account;
    if (!this.request.body) this.throw(401);
    if (this.request.body.username !== account.username) this.throw(401);
    if (this.request.body.password !== account.password) this.throw(401);

    this.body = { token: createToken(this) };
  });

  app.del('/session', function *(next) {
    console.log('del');
    this.throw(405);
  });

};

function createToken(context) {
  var options = context.app.account;
  var profile = {
    username: context.request.body.username
  };

  return jwt.sign(profile, options.secret, options);
}
