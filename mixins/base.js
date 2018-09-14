'use strict';

var assign = require('lodash/assign');
var qs = require('qs');

/**
 * This provides methods used by resources that have no relationships with
 * other resources. It's not meant to be used directly.
 *
 * @mixin
 */
var base = {
  /**
   * Counts the number of records.
   *
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  count: function count(params) {
    var key = 'count';
    var url = this.buildUrl(key, params);
    return this.shopify.request(url, 'GET', key);
  },


  /**
   * Creates a new record.
   *
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  create: function create(params) {
    var url = this.buildUrl();
    return this.shopify.request(url, 'POST', this.key, params);
  },


  /**
   * Deletes a record.
   *
   * @param {Number} id Record ID
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  delete: function _delete(id) {
    var url = this.buildUrl(id);
    return this.shopify.request(url, 'DELETE');
  },


  /**
   * Gets a single record by its ID.
   *
   * @param {Number} id Record ID
   * @param {Object} [params] Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  get: function get(id, params) {
    var url = this.buildUrl(id, params);
    return this.shopify.request(url, 'GET', this.key);
  },


  /**
   * Gets a list of records.
   *
   * @param {Object} params Query parameters
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  list: function list(params) {
    var url = this.buildUrl(undefined, params);
    return this.shopify.request(url, 'GET', this.name);
  },


  /**
   * Updates a record.
   *
   * @param {Number} id Record ID
   * @param {Object} params Record properties
   * @return {Promise} Promise that resolves with the result
   * @public
   */
  update: function update(id, params) {
    var url = this.buildUrl(id);
    return this.shopify.request(url, 'PUT', this.key, params);
  },


  /**
   * Builds the request URL.
   *
   * @param {Number|String} [id] Record ID
   * @param {Object} [query] Query parameters
   * @return {Object} URL object
   * @private
   */
  buildUrl: function buildUrl(id, query) {
    id || id === 0 || (id = '');

    var path = ('/admin/' + this.name + '/' + id).replace(/\/+/g, '/').replace(/\/$/, '');

    path += '.json';

    if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

    return assign({ path: path }, this.shopify.baseUrl);
  }
};

module.exports = base;