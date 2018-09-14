'use strict';

var assign = require('lodash/assign');

var base = require('../mixins/base');

/**
 * Creates a Blog instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Blog(shopify) {
  this.shopify = shopify;

  this.name = 'blogs';
  this.key = 'blog';
}

assign(Blog.prototype, base);

module.exports = Blog;