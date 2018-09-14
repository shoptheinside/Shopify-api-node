'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates an InventoryItem instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function InventoryItem(shopify) {
  this.shopify = shopify;

  this.name = 'inventory_items';
  this.key = 'inventory_item';
}

assign(InventoryItem.prototype, omit(base, ['count', 'create', 'delete']));

module.exports = InventoryItem;