// Include libraries
var mongoose = require('mongoose');
var router = require('koa-resource-router');

/**
* API General Object
*
* @param {Object} api_options A config object
* @param {String} api_options.version Api version
* @param {String} api_options.url MongoDB connection url
* @param {String} [api_options.name] Api name
* @return {Object} Returns api object
*/
API = function ( api_options ) {

  this.api_options = api_options;

  // Mongoose database connection pointer
  this.db = mongoose.connect(api_options.mongo.url);

  // Array for registered resources
  this.resources = [];


  /**
  * Register single resource
  *
  * @param {Object} options A config object
  * @param {String} options.name The name api resource
  * @param {String} options.url MongoDB connection url
  * @return {Object} Returns api object
  */
  this.register = function ( options ) {

    var schema = new mongoose.Schema(options.schema);
    var model = mongoose.model(options.name, schema);
    var resource = router(options.name, options.actions);
    this.resources.push(resource);

  }

};

/**
* Add middleware method to return registered resources
*
* @return {Object} Returns generator including all resources
*/
API.prototype.middleware = function() {
  var api = this;

  return function *(next) {
    api.resources.forEach( function ( resource ) {
      yield resource.middleware();
    }
  }

}

module.exports = API;
