'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var baseChild = require('../mixins/base-child');

/**
 * Creates a Payment instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Payment(shopify) {
  this.shopify = shopify;

  this.parentName = 'checkouts';
  this.name = 'payments';
  this.key = 'payment';
}

assign(Payment.prototype, omit(baseChild, ['delete', 'update']));

module.exports = Payment;