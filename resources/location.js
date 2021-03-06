'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Location instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Location(shopify) {
  this.shopify = shopify;

  this.name = 'locations';
  this.key = 'location';
}

assign(Location.prototype, omit(base, ['create', 'delete', 'update']));

/**
 * Retrieves a list of inventory levels for a location.
 *
 * @param {Number} id Location ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Location.prototype.inventoryLevels = function inventoryLevels(id) {
  var key = 'inventory_levels';
  var url = this.buildUrl(id + '/' + key);
  return this.shopify.request(url, 'GET', key);
};

module.exports = Location;