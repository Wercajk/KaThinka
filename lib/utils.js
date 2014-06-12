/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Misc helper functions
 */
module.exports = {

  /**
   * Load config file if exists
   *
   * @param {String} filePath Path to config file
   * @return {Hash} Returns config or false if missing
   */
  loadConfig: function( filePath ) {

    if ( fs.existsSync(filePath) ) {
      console.info('Loading ' + filePath + ' as config file');
      return require(filePath);
    } else {
      return false;
    }

  }
};
