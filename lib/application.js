/**
 * Module dependencies.
 */
// var debug = require('debug')('kathinka:application');
var koa = require('koa');
// var compose = require('koa-compose');
var mongoose = require('mongoose');

var util = require('./utils');
var resources = require('./resources');

var defaultConfig = require('../config.json');

/**
 * Application prototype.
 */

var app = Application.prototype;

/**
 * Expose `Application`.
 */

exports = module.exports = Application;

/**
 * Initialize a new API
 *
 * @param {Object} config A config object
 * @param {String} config.version Api version
 * @param {String} config.db MongoDB connection url
 * @param {String} config.url MongoDB connection url
 * @param {String} [config.name] Api name
 * @return {Object} Returns api object
 * @api public
 */
function Application( config ) {
  if (!(this instanceof Application)) { return new Application(config); }

  // Load config
  this.config = (
    config ||
    util.loadConfig(process.cwd() + '/config.json') ||
    defaultConfig
  );

  // Setup Koa app
  this.koa = koa();

  // Mongoose database connection pointer
  this.db = {
    mongo: mongoose.connect(this.config.db.mongo.url)
  };

  // Load Resources Object
  this.res = resources(this);

  this.start();
}


app.start = function () {
  console.log("Starting server on port "+ this.config.server.port);
  this.koa.listen(this.config.server.port);
};
