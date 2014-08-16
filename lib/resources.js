'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('kathinka:resources');
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

/**
 * Load App files
 *
 * @return {Void}
 */
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

    if (
      resource.blueprint.schema_options &&
      typeof resource.blueprint.schema_options.middleware == 'function'
    ) {
      resource.blueprint.schema_options.middleware(schema);
    }

    resource.model = mongoose.model(name, schema);

    if (
      resource.blueprint.schema_options &&
      typeof resource.blueprint.schema_options.onInit == 'function'
    ) {
      resource.blueprint.schema_options.onInit(resource.model);
    }
  }

};

/**
 * Header set middleware
 * @param {Array} methods
 * @return {Function} Generator function with defined OPTIONS response
*/
res.defineOptions = function( methods ) {

  return function *() {

    if ( methods.allow !== undefined ) {
      this.set('Allow', methods.allow.join(', '));
    }

    this.set('Accept', 'application/json');
    this.set('Content-Type', 'application/json');
    this.body = {};
  };
};

/**
 * Build rigid routes like entry point
 */
res.buildDefaultRoutes = function() {

  var my = this;

  // List entry point options
  this.app.koa.use(route.options('/', this.defineOptions({ allow: ['GET']})));

  // Build entry point
  this.app.koa.use(route.get('/', function *() {

    var dbResponse = yield my.app.APIModel.find().exec();

    var APIData = dbResponse[0];

    this.body = {
      'status': APIData.status,
      'version': APIData.version
    };
  }));

};

/**
 * Build app collections/resources
 *
 * @return {Void}
 */
res.buildUserResources = function() {
  /* jshint loopfunc:true */

  var my = this;

  // Build user defined resources
  var keys = Object.keys(this.resources);
  var i = keys.length;

  while (i--) {
    var name = keys[i];
    var currentResource = my.resources[name];

    // List collection options
    this.app.koa.use(route.options('/' + name, this.defineOptions({ allow: ['POST', 'GET']})));

    // List resource options
    this.app.koa.use(route.options('/' + name + '/:label', this.defineOptions({ allow: ['GET', 'PATCH', 'PUT', 'DELETE']})));

    // Create new item
    this.app.koa.use(route.post('/' + name, function *() {

      var record = yield parse.json(this);

      // TODO: we should filter and validate here

      var newDbRecord = yield currentResource.model.create(record);

      // Filter output using filter method
      // TODO: we should avoid aditional db request
      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecord = yield currentResource
                            .model
                              .findOne({'_id': newDbRecord._id}, slectFilter)
                                .exec();
      this.body = dbRecord;
      this.response.status = 201;
    }));

    // List all items
    this.app.koa.use(route.get('/' + name, function *() {
      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecords = yield currentResource
                              .model
                                .find({}, slectFilter).exec();
      this.body = dbRecords;
    }));

    // Show one item
    this.app.koa.use(route.get('/' + name + '/:label', function *( label ) {
      var slectFilter = Object.keys(currentResource.blueprint.schema).join(' ');
      var dbRecord = yield currentResource
                            .model
                              .findOne({label: label}, slectFilter).exec();
      this.body = dbRecord;
    }));

    // Update one item using partial/full data
    this.app.koa.use(route.patch('/' + name + '/:label', function *( label ) {
      var record = yield parse.json(this);
      var dbRecord = yield currentResource
                            .model
                              .update({label: label}, record).exec();
      this.response.status = 204;
    }));

    // Update/Create one item using full data which replace original
    this.app.koa.use(route.put('/' + name + '/:label', function *( label ) {
      var record = yield parse.json(this);

      // Replace resource with new data
      var newRecord = {};
      var schemaAttrsKeys = Object.keys(currentResource.blueprint.schema);
      var schemaAttrsLength = schemaAttrsKeys.length;

      while ( schemaAttrsLength-- ) {
        var schemaAttrName = schemaAttrsKeys[schemaAttrsLength];
        newRecord[schemaAttrName] = record[schemaAttrName];
      }

      var dbRecord = yield currentResource
                            .model
                              .update({label: label}, newRecord, {upsert: true}).exec();
      this.response.status = 204;
    }));

    // Delete one item
    this.app.koa.use(route.delete('/' + name + '/:label', function *( label ) {
      var dbRecord = yield currentResource
                            .model
                              .findOne({label: label}).remove().exec();
      this.response.status = 204;
    }));

    debug('Building routes for '+ name);
  }

};
