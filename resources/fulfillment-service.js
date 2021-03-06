'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a FulfillmentService instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function FulfillmentService(shopify) {
  this.shopify = shopify;

  this.name = 'fulfillment_services';
  this.key = 'fulfillment_service';
}

assign(FulfillmentService.prototype, omit(base, ['count']));

module.exports = FulfillmentService;