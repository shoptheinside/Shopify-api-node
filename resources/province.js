'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var baseChild = require('../mixins/base-child');

/**
 * Creates a Province instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Province(shopify) {
  this.shopify = shopify;

  this.parentName = 'countries';
  this.name = 'provinces';
  this.key = 'province';
}

assign(Province.prototype, omit(baseChild, ['create', 'delete']));

module.exports = Province;