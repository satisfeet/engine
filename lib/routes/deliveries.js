var mongoose = require('mongoose');

module.exports = function(app) {

  var Supply = mongoose.models.Supply;

  app.get('/supplies', function(req, res, next) {
    Supply.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

};
