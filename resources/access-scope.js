'use strict';

var assign = require('lodash/assign');

/**
 * Creates an AccessScope instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function AccessScope(shopify) {
  this.shopify = shopify;

  this.name = 'access_scopes';
}

/**
 * Retrieves a list of access scopes associated to the access token.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
AccessScope.prototype.list = function list() {
  var path = '/admin/oauth/' + this.name + '.json';
  var url = assign({ path: path }, this.shopify.baseUrl);
  return this.shopify.request(url, 'GET', this.name);
};

module.exports = AccessScope;