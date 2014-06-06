var mongoose = require('mongoose');

module.exports = function(app) {

  var Process = mongoose.models.Process;

  app.post('/processes', function *(next) {
    var result = yield Process.create(this.request.body);

    this.status = 201;
  });

  app.get('/processes', function *(next) {
    var result = yield Process.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.get('/processes/:id', function *(next) {
    var result = yield Process.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.put('/processes/:id', function *(next) {
    var result = yield Process.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body);

    this.status = 204;
  });

  app.del('/processes/:id', function *(next) {
    var result = yield Process.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy();

    this.status = 204;
  });

};
