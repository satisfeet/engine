module.exports = function(app, db) {

  app.customers = {
    find: function(callback) {
      db.query('SELECT * FROM customers', callback);
    }
  };

};
