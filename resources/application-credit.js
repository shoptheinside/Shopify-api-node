'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates an ApplicationCredit instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function ApplicationCredit(shopify) {
  this.shopify = shopify;

  this.name = 'application_credits';
  this.key = 'application_credit';
}

assign(ApplicationCredit.prototype, omit(base, ['count', 'delete', 'update']));

module.exports = ApplicationCredit;