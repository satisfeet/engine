var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function LimitBlock() {
  this.command = null;

  squel.cls.Block.apply(this, arguments);
}

util.inherits(LimitBlock, squel.cls.Block);

LimitBlock.prototype.limit = function(option) {
  if (!lodash.isNumber(option)) return;

  this.command = 'LIMIT ' + option;
};

LimitBlock.prototype.buildStr = function() {
  if (!this.command) return '';

  return this.command;
};

module.exports = LimitBlock;
