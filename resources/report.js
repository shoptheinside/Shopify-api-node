'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Report instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Report(shopify) {
  this.shopify = shopify;

  this.name = 'reports';
  this.key = 'report';
}

assign(Report.prototype, omit(base, 'count'));

module.exports = Report;