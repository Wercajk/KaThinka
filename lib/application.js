"use strict";

/**
 * Module dependencies.
 */
var debug = require('debug')('kathinka:application');
var koa = require('koa');
// var compose = require('koa-compose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nconf = require('nconf');

var util = require('./utils');
var resources = require('./resources');

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
function Application(config) {
  if (!(this instanceof Application)) {
    return new Application(config);
  }

  // Load config
  this.nConfig = nconf.argv()
                  .env()
                  .file({ file: '../config.json' })
                  .file({ file: process.cwd() + '/config.json' })
                  .overrides(config);

  // Setup Koa app
  this.koa = koa();

  // Mongoose database connection pointer
  debug('Opening db connection with ' + this.nConfig.get('db:mongo:url'));
  this.db = {
    mongo: mongoose.connect(this.nConfig.get('db:mongo:url'))
  };

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function callback() {
    console.log('MongoDB connected');
  });

  this.setup_api_schema();

  // Load Resources Object
  this.res = resources(this);
  this.start();
}

// Setup API Model to verify status on entry point
app.setup_api_schema = function() {

  // Define API Schema
  var APISchema = new Schema({
    version: String,
    status: String
  });

  // Instantiate API Schema
  this.APIModel = mongoose.model('API', APISchema);

  // Add new record with current API status
  var apiRecord = new this.APIModel({
    version: ( '' + this.nConfig.get('version') + '' || 'unknown'),
    status: 'ok'
  });

  // Remove previous records prior to adding new one
  this.APIModel.find().remove(function() {

    // Save new record
    apiRecord.save();

  });

};

app.start = function() {
  console.log("Starting server on port " + this.nConfig.get('server:port'));
  this.koa.listen(this.nConfig.get('server:port'));
};
