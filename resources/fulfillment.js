'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var baseChild = require('../mixins/base-child');

/**
 * Creates a Fulfillment instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Fulfillment(shopify) {
  this.shopify = shopify;

  this.parentName = 'orders';
  this.name = 'fulfillments';
  this.key = 'fulfillment';
}

assign(Fulfillment.prototype, omit(baseChild, ['delete']));

/**
 * Completes a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment id
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.complete = function complete(orderId, id) {
  var _this = this;

  var url = this.buildUrl(orderId, id + '/complete');
  return this.shopify.request(url, 'POST', undefined, {}).then(function (body) {
    return body[_this.key];
  });
};

/**
 * Opens a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment id
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.open = function open(orderId, id) {
  var _this2 = this;

  var url = this.buildUrl(orderId, id + '/open');
  return this.shopify.request(url, 'POST', undefined, {}).then(function (body) {
    return body[_this2.key];
  });
};

/**
 * Cancels a pending fulfillment.
 *
 * @param {Number} orderId Order ID
 * @param {Number} id Fulfillment id
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Fulfillment.prototype.cancel = function cancel(orderId, id) {
  var _this3 = this;

  var url = this.buildUrl(orderId, id + '/cancel');
  return this.shopify.request(url, 'POST', undefined, {}).then(function (body) {
    return body[_this3.key];
  });
};

module.exports = Fulfillment;