'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates an Event instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Event(shopify) {
  this.shopify = shopify;

  this.name = 'events';
  this.key = 'event';
}

assign(Event.prototype, omit(base, ['create', 'delete', 'update']));

module.exports = Event;