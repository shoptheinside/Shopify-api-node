'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Checkout instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Checkout(shopify) {
  this.shopify = shopify;

  this.name = 'checkouts';
  this.key = 'checkout';
}

assign(Checkout.prototype, omit(base, 'delete'));

/**
 * Completes a free checkout.
 *
 * @param {String} token Checkout token
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Checkout.prototype.complete = function complete(token) {
  var _this = this;

  var url = this.buildUrl(token + '/complete');
  return this.shopify.request(url, 'POST', undefined, {}).then(function (body) {
    return body[_this.key];
  });
};

/**
 * Gets a list of available shipping rates for the specified checkout.
 *
 * @param {String} token Checkout token
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Checkout.prototype.shippingRates = function shippingRates(token) {
  var url = this.buildUrl(token + '/shipping_rates');
  return this.shopify.request(url, 'GET', 'shipping_rates');
};

module.exports = Checkout;