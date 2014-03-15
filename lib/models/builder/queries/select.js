var util  = require('util');
var squel = require('squel');

var WhereBlock = require('../blocks/where');
var LimitBlock = require('../blocks/limit');
var IdentBlock = require('../blocks/ident');
var SearchBlock = require('../blocks/search');
var FilterBlock = require('../blocks/filter');

function SelectQuery(options) {
  squel.cls.QueryBuilder.call(this, options, [
    new squel.cls.StringBlock(options, 'SELECT'),
    new squel.cls.GetFieldBlock(options),
    new squel.cls.FromTableBlock(options),
    new squel.cls.JoinBlock(options),
    new WhereBlock(options),
    new IdentBlock(options),
    new SearchBlock(options),
    new FilterBlock(options),
    new LimitBlock(options)
  ]);
}

util.inherits(SelectQuery, squel.cls.QueryBuilder);

module.exports = SelectQuery;
