var util  = require('util');
var squel = require('squel');

var WhereBlock = require('../blocks/where');
var IdentBlock = require('../blocks/ident');
var LimitBlock = require('../blocks/limit');

function DeleteQuery(options) {
  squel.cls.QueryBuilder.call(this, options, [
    new squel.cls.StringBlock(options, 'DELETE'),
    new squel.cls.FromTableBlock(options),
    new WhereBlock(options),
    new IdentBlock(options),
    new LimitBlock(options)
  ]);
}

util.inherits(DeleteQuery, squel.cls.QueryBuilder);

module.exports = DeleteQuery;
