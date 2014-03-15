var util  = require('util');
var squel = require('squel');

var SetBlock = require('../blocks/set');
var WhereBlock = require('../blocks/where');
var IdentBlock = require('../blocks/ident');

function UpdateQuery(options) {
  squel.cls.QueryBuilder.call(this, options, [
    new squel.cls.StringBlock(options, 'UPDATE'),
    new squel.cls.UpdateTableBlock(options),
    new SetBlock(options),
    new WhereBlock(options),
    new IdentBlock(options)
  ]);
}

util.inherits(UpdateQuery, squel.cls.QueryBuilder);

module.exports = UpdateQuery;
