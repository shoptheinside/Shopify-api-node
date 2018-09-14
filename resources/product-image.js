'use strict';

var assign = require('lodash/assign');

var baseChild = require('../mixins/base-child');

/**
 * Creates a ProductImage instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ProductImage(shopify) {
  this.shopify = shopify;

  this.parentName = 'products';
  this.name = 'images';
  this.key = 'image';
}

assign(ProductImage.prototype, baseChild);

module.exports = ProductImage;