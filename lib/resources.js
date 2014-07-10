/**
 * Module dependencies.
 */

var fs = require('fs');
var mongoose = require('mongoose');

/**
 * Application prototype.
 */

var res = Resources.prototype;

/**
 * Expose `Resources`.
 */

exports = module.exports = Resources;


/**
 * Initialize Resources object
 *
 * @return {Object} Returns api object
 * @api public
 */
function Resources(app) {
  if (!(this instanceof Resources)) { return new Resources(app); }

  this.app = app;

  // Array for registered resources
  this.app.resources = this.resources = {};

  this.filesRoot = process.cwd() + '/app/resources/';

  this.loadFiles();

  this.buildModels();

  this.buildRoutes();
}


res.loadFiles = function() {
  this.resourceFiles = fs.readdirSync(this.filesRoot);

  var i = this.resourceFiles.length;

  while (i--) {
    this.resources[this.resourceFiles[i].split('.')[0]] = {
      blueprint: require(this.filesRoot + this.resourceFiles[i])
    };
  }
};

res.buildModels = function() {

  var keys = Object.keys(this.resources);
  var i = keys.length;

  while (i--) {
    var name = keys[i];
    var resource = this.resources[name];

    var schema = new mongoose.Schema(resource.blueprint.schema);

    resource.model = mongoose.model(name, schema);
  }

};

res.buildRoutes = function() {

  var keys = Object.keys(this.resources);
  var i = keys.length;

  while (i--) {
    var name = keys[i];
    // var resource = this.resources[name];

    console.log("Building routes for "+ name);
  }

};
