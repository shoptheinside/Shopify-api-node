'use strict';

var assign = require('lodash/assign');

var base = require('../mixins/base');

/**
 * Creates a Metafield instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Metafield(shopify) {
  this.shopify = shopify;

  this.name = 'metafields';
  this.key = 'metafield';
}

assign(Metafield.prototype, base);

module.exports = Metafield;