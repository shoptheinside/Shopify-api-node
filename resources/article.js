'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = require('lodash/assign');
var qs = require('qs');

var baseChild = require('../mixins/base-child');
var base = require('../mixins/base');

/**
 * Creates an Article instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Article(shopify) {
  this.shopify = shopify;

  this.parentName = 'blogs';
  this.name = 'articles';
  this.key = 'article';
}

assign(Article.prototype, baseChild);

/**
 * Gets a list of all the authors of articles.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Article.prototype.authors = function authors() {
  var key = 'authors';
  var url = base.buildUrl.call(this, key);
  return this.shopify.request(url, 'GET', key);
};

/**
 * Gets a list of all the tags of articles.
 *
 * @param {Number} [blogId] Blog ID
 * @param {Object} [params] Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Article.prototype.tags = function tags(blogId, params) {
  var path = '/admin';

  if (!params && (typeof blogId === 'undefined' ? 'undefined' : _typeof(blogId)) === 'object') {
    params = blogId;
    blogId = undefined;
  }

  if (blogId || blogId === 0) path += '/blogs/' + blogId;

  path += '/' + this.name + '/tags.json';

  if (params) path += '?' + qs.stringify(params, { arrayFormat: 'brackets' });

  var url = assign({ path: path }, this.shopify.baseUrl);
  return this.shopify.request(url, 'GET', 'tags');
};

module.exports = Article;