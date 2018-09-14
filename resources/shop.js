'use strict';

var assign = require('lodash/assign');
var pick = require('lodash/pick');

var base = require('../mixins/base');

/**
 * Creates a Shop instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Shop(shopify) {
  this.shopify = shopify;

  this.name = this.key = 'shop';
}

assign(Shop.prototype, pick(base, 'buildUrl'));

/**
 * Gets the configuration of the shop.
 *
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Shop.prototype.get = function get(params) {
  var url = this.buildUrl(undefined, params);
  return this.shopify.request(url, 'GET', this.key);
};

module.exports = Shop;