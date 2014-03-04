var mysql = require('mysql');

module.exports = function(app, db) {

  app.customers = {
    find: function(callback) {
      db.query('SELECT * FROM customers', callback);
    },
    create: function(document, callback) {
      prepare(document);

      db.query('INSERT INTO customers SET ?', document, callback);
    }
  };

};

function prepare(document) {
  if (!document.company) {
    document.company = null;
  }
}
