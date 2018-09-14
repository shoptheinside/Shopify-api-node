'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Theme instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Theme(shopify) {
  this.shopify = shopify;

  this.name = 'themes';
  this.key = 'theme';
}

assign(Theme.prototype, omit(base, ['count']));

module.exports = Theme;