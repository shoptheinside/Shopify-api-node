'use strict';

var assign = require('lodash/assign');

var base = require('../mixins/base');

/**
 * Creates a Page instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Page(shopify) {
  this.shopify = shopify;

  this.name = 'pages';
  this.key = 'page';
}

assign(Page.prototype, base);

module.exports = Page;