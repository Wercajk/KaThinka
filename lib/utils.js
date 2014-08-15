'use strict';

/**
 * Module dependencies.
 */

var nconf = require('nconf');

/**
 * Misc helper functions
 */
module.exports = {

  /**
   * Load config file if exists
   *
   * @param {String} filePath Path to config file
   * @return {Hash|Boolean} Returns config or false if missing
   * @api public
   */
  loadConfig: function( defaultConfig ) {

    return nconf.argv()
            .env()
            .file({ file: '../config.json' })
            .file({ file: process.cwd() + '/config.json' })
            .overrides( defaultConfig );

  }
};
