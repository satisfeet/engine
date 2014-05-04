const FORMATS  = ['json'];
const CHARSETS = ['utf-8'];

module.exports = function *(next) {
  if (!this.accepts(FORMATS)) this.throw(406);
  if (!this.acceptsCharsets(CHARSETS)) this.throw(406);

  yield next;
};

module.exports._name = 'accept';
