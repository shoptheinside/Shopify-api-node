'use strict';

var assign = require('lodash/assign');
var pick = require('lodash/pick');

var base = require('../mixins/base');

/**
 * Creates a ShippingZone instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ShippingZone(shopify) {
  this.shopify = shopify;

  this.name = this.key = 'shipping_zones';
}

assign(ShippingZone.prototype, pick(base, ['list', 'buildUrl']));

module.exports = ShippingZone;