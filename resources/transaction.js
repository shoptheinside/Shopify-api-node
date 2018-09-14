'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var baseChild = require('../mixins/base-child');

/**
 * Creates a Transaction instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Transaction(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'transactions';
  this.key = 'transaction';
}

assign(Transaction.prototype, omit(baseChild, ['delete', 'update']));

module.exports = Transaction;