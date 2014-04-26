module.exports = function(app) {

  app.use(accept);

  require('./customers')(app);

};

function* accept(next) {
  if (!this.accepts('json')) this.throw(406);

  yield next;
}
