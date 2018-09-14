'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var assign = require('lodash/assign');
var omit = require('lodash/omit');

var base = require('../mixins/base');

/**
 * Creates a RecurringApplicationCharge instance.
 *
 * @param {Shopify} shopify Reference to the Shopify instance
 * @constructor
 * @public
 */
function RecurringApplicationCharge(shopify) {
  this.shopify = shopify;

  this.name = 'recurring_application_charges';
  this.key = 'recurring_application_charge';
}

assign(RecurringApplicationCharge.prototype, omit(base, ['count', 'update']));

/**
 * Activates a recurring application charge.
 *
 * @param {Number} id Recurring application charge ID
 * @param {Object} params Recurring application charge properties
 * @return {Promise} Promise that resolves with the result
 * @public
 */
RecurringApplicationCharge.prototype.activate = function activate(id, params) {
  var _this = this;

  var url = this.buildUrl(id + '/activate');
  return this.shopify.request(url, 'POST', undefined, _defineProperty({}, this.key, params)).then(function (body) {
    return body[_this.key];
  });
};

module.exports = RecurringApplicationCharge;