var util  = require('util');
var squel = require('squel');

var SetBlock = require('../blocks/set');

function InsertQuery(options) {
  squel.cls.QueryBuilder.call(this, options, [
    new squel.cls.StringBlock(options, 'INSERT'),
    new squel.cls.IntoTableBlock(options),
    new SetBlock(options)
  ]);
}

util.inherits(InsertQuery, squel.cls.QueryBuilder);

module.exports = InsertQuery;
