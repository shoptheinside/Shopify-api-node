'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a CarrierService instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CarrierService(shopify) {
  this.shopify = shopify;

  this.name = 'carrier_services';
  this.key = 'carrier_service';
}

assign(CarrierService.prototype, omit(base, ['count']));

module.exports = CarrierService;