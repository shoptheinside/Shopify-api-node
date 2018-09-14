'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var camelCase = require('lodash/camelCase');
var transform = require('lodash/transform');
var defaults = require('lodash/defaults');
var assign = require('lodash/assign');
var EventEmitter = require('events');
var stopcock = require('stopcock');
var path = require('path');
var got = require('got');
var fs = require('fs');

var pkg = require('./package');

/**
 * Creates a Shopify instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.shopName The name of the shop
 * @param {String} options.apiKey The API Key
 * @param {String} options.password The private app password
 * @param {String} options.accessToken The persistent OAuth public app token
 * @param {Boolean|Object} [options.autoLimit] Limits the request rate
 * @param {Number} [options.timeout] The request timeout
 * @constructor
 * @public
 */
function Shopify(options) {
  if (!(this instanceof Shopify)) return new Shopify(options);
  if (!options || !options.shopName || !options.accessToken && (!options.apiKey || !options.password) || options.accessToken && (options.apiKey || options.password)) {
    throw new Error('Missing or invalid options');
  }

  EventEmitter.call(this);
  this.options = defaults(options, { timeout: 60000 });

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };

  this.baseUrl = {
    auth: !options.accessToken && options.apiKey + ':' + options.password,
    hostname: !options.shopName.endsWith('.myshopify.com') ? options.shopName + '.myshopify.com' : options.shopName,
    protocol: 'https:'
  };

  if (options.autoLimit) {
    var conf = transform(options.autoLimit, function (result, value, key) {
      if (key === 'calls') key = 'limit';
      result[key] = value;
    }, { bucketSize: 35 });

    this.request = stopcock(this.request, conf);
  }
}

Object.setPrototypeOf(Shopify.prototype, EventEmitter.prototype);

/**
 * Updates API call limits.
 *
 * @param {String} header X-Shopify-Shop-Api-Call-Limit header
 * @private
 */
Shopify.prototype.updateLimits = function updateLimits(header) {
  if (!header) return;

  var limits = header.split('/').map(Number);
  var callLimits = this.callLimits;

  callLimits.remaining = limits[1] - limits[0];
  callLimits.current = limits[0];
  callLimits.max = limits[1];

  this.emit('callLimits', callLimits);
};

/**
 * Sends a request to a Shopify API endpoint.
 *
 * @param {Object} url URL object
 * @param {String} method HTTP method
 * @param {String} [key] Key name to use for req/res body
 * @param {Object} [params] Request body
 * @return {Promise}
 * @private
 */
Shopify.prototype.request = function request(url, method, key, params) {
  var _this = this;

  var options = assign({
    headers: { 'User-Agent': pkg.name + '/' + pkg.version },
    timeout: this.options.timeout,
    json: true,
    retries: 0,
    method: method
  }, url);

  if (this.options.accessToken) {
    options.headers['X-Shopify-Access-Token'] = this.options.accessToken;
  }

  if (params) {
    var body = key ? _defineProperty({}, key, params) : params;

    options.headers['Content-Type'] = 'application/json';
    options.body = body;
  }

  return got(options).then(function (res) {
    var body = res.body;

    _this.updateLimits(res.headers['x-shopify-shop-api-call-limit']);

    if (key) return body[key];
    return body || {};
  }, function (err) {
    _this.updateLimits(err.response && err.response.headers['x-shopify-shop-api-call-limit']);

    return Promise.reject(err);
  });
};

//
// Require and instantiate the resources lazily.
//
fs.readdirSync(path.join(__dirname, 'resources')).forEach(function (name) {
  var prop = camelCase(name.slice(0, -3));

  Object.defineProperty(Shopify.prototype, prop, {
    get: function get() {
      var resource = require('./resources/' + name);

      return Object.defineProperty(this, prop, {
        value: new resource(this)
      })[prop];
    },
    set: function set(value) {
      return Object.defineProperty(this, prop, { value: value })[prop];
    }
  });
});

module.exports = Shopify;