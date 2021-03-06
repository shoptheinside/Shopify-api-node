'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var baseChild = require('../mixins/base-child');

/**
 * Creates a UsageCharge instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function UsageCharge(shopify) {
  this.shopify = shopify;

  this.parentName = 'recurring_application_charges';
  this.name = 'usage_charges';
  this.key = 'usage_charge';
}

assign(UsageCharge.prototype, omit(baseChild, ['count', 'delete', 'update']));

module.exports = UsageCharge;