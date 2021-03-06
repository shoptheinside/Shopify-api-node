'use strict';

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a Comment instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function Comment(shopify) {
  this.shopify = shopify;

  this.name = 'comments';
  this.key = 'comment';
}

assign(Comment.prototype, omit(base, ['delete']));

/**
 * Marks a comment as spam.
 *
 * @param {Number} id Comment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Comment.prototype.spam = function spam(id) {
  var url = this.buildUrl(id + '/spam');
  return this.shopify.request(url, 'POST', undefined, {});
};

/**
 * Marks a comment as not spam.
 *
 * @param {Number} id Comment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Comment.prototype.notSpam = function notSpam(id) {
  var url = this.buildUrl(id + '/not_spam');
  return this.shopify.request(url, 'POST', undefined, {});
};

/**
 * Approves a pending comment.
 *
 * @param {Number} id Comment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Comment.prototype.approve = function approve(id) {
  var url = this.buildUrl(id + '/approve');
  return this.shopify.request(url, 'POST', undefined, {});
};

/**
 * Removes a comment.
 *
 * @param {Number} id Comment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Comment.prototype.remove = function remove(id) {
  var url = this.buildUrl(id + '/remove');
  return this.shopify.request(url, 'POST', undefined, {});
};

/**
 * Restores a comment.
 *
 * @param {Number} id Comment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Comment.prototype.restore = function restore(id) {
  var url = this.buildUrl(id + '/restore');
  return this.shopify.request(url, 'POST', undefined, {});
};

module.exports = Comment;