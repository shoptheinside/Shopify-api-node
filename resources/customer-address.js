'use strict';

var assign = require('lodash/assign');
var pick = require('lodash/pick');

var baseChild = require('../mixins/base-child');

/**
 * Creates an CustomerAddress instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function CustomerAddress(shopify) {
  this.shopify = shopify;

  this.parentName = 'customers';
  this.name = 'addresses';
  this.key = 'customer_address';
}

assign(CustomerAddress.prototype, pick(baseChild, ['buildUrl', 'delete', 'get']));

/**
 * Gets a list of addresses for a customer.
 *
 * @param {Number} customerId Customer ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerAddress.prototype.list = function list(customerId, params) {
  var url = this.buildUrl(customerId, undefined, params);
  return this.shopify.request(url, 'GET', this.name);
};

/**
 * Creates a new address for a customer.
 *
 * @param {Number} customerId Customer ID
 * @param {Object} params Address properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerAddress.prototype.create = function create(customerId, params) {
  var _this = this;

  var url = this.buildUrl(customerId);
  return this.shopify.request(url, 'POST', undefined, { address: params }).then(function (body) {
    return body[_this.key];
  });
};

/**
 * Updates a customer address.
 *
 * @param {Number} customerId Customer ID
 * @param {Number} id Address ID
 * @param {Object} params Address properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerAddress.prototype.update = function update(customerId, id, params) {
  var _this2 = this;

  var url = this.buildUrl(customerId, id);
  return this.shopify.request(url, 'PUT', undefined, { address: params }).then(function (body) {
    return body[_this2.key];
  });
};

/**
 * Performs bulk operations against a number of addresses.
 *
 * @param {Number} customerId Customer ID
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerAddress.prototype.set = function set(customerId, params) {
  var url = this.buildUrl(customerId, 'set', params);
  return this.shopify.request(url, 'PUT');
};

/**
 * Sets default address for a customer.
 *
 * @param {Number} customerId Customer ID
 * @param {Number} id Address ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CustomerAddress.prototype.default = function defaultAddress(customerId, id) {
  var url = this.buildUrl(customerId, id + '/default');
  return this.shopify.request(url, 'PUT', this.key);
};

module.exports = CustomerAddress;