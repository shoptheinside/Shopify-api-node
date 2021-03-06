'use strict';

var assign = require('lodash/assign');
var pick = require('lodash/pick');

var base = require('../mixins/base');

/**
 * Creates a User instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function User(shopify) {
  this.shopify = shopify;

  this.name = 'users';
  this.key = 'user';
}

assign(User.prototype, pick(base, ['get', 'list', 'buildUrl']));

/**
 * Gets the current logged-in user.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
User.prototype.current = function () {
  return this.get('current');
};

module.exports = User;