module.exports = function *(next) {
  try {
    yield next;
  } catch(err) {
    if (err.expose === false) return;

    this.app.emit('error', err, this);
  }
};

module.exports._name = 'error:events';
