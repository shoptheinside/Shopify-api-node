'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Collect instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Collect(shopify) {
  this.shopify = shopify;

  this.name = 'collects';
  this.key = 'collect';
}

assign(Collect.prototype, omit(base, ['update']));

module.exports = Collect;