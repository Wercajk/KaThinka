/**
 * Module dependencies.
 */

var fs = require('fs');
var mongoose = require('mongoose');
var route = require('koa-route');
var parse = require('co-body');

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

  this.buildDefaultRoutes();

  this.buildUserResources();
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

res.buildDefaultRoutes = function() {

  var my = this;

  // Build entry point
  this.app.koa.use(route.get('/', function *() {

    var dbResponse = yield my.app.APIModel.find().exec();

    var APIData = dbResponse[0];

    this.body = {
      "status": APIData.status,
      "version": APIData.version
    };
  }));

};

res.buildUserResources = function() {

  var my = this;

  // Build user defined resources
  var keys = Object.keys(this.resources);
  var i = keys.length;

  while (i--) {
    var name = keys[i];
    var currentResource = my.resources[name];

    // Create new item
    this.app.koa.use(route.post('/' + name, function *() {

      var record = yield parse.json(this);

      // TODO: we should filter and validate here

      var newDbRecord = yield currentResource.model.create(record);

      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecord = yield currentResource.model.findOne({"_id": newDbRecord._id}, slectFilter).exec();
      this.body = dbRecord;
      this.response.status = 201;
    }));

    // List all items
    this.app.koa.use(route.get('/' + name, function *() {
      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecords = yield currentResource.model.find({}, slectFilter).exec();
      this.body = dbRecords;
    }));

    // Show one item
    this.app.koa.use(route.get('/' + name + '/:label', function *(label) {
      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecord = yield currentResource.model.findOne({label: label}, slectFilter).exec();
      this.body = dbRecord;
    }));

    // Update one item
    this.app.koa.use(route.put('/' + name + '/:label', function *(label) {
      var record = yield parse.json(this);
      var dbRecord = yield currentResource.model.update({label: label}, record).exec();
      this.response.status = 204;
    }));

    // Delete one item
    this.app.koa.use(route.delete('/' + name + '/:label', function *(label) {
      var dbRecord = yield currentResource.model.findOne({label: label}).remove().exec();
      this.response.status = 204;
    }));

    console.log("Building routes for "+ name);
  }

}
