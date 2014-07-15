var gulp = require('gulp'),
  spawn = require('child_process').spawn,
  node;

var startServer = function() {

  if (node) node.kill()
  node = spawn('node', ['--harmony', 'index.js'], {
    stdio: 'inherit'
  })
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });

};

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  startServer();
});


/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
  startServer();
  gulp.watch(['./index.js', '**/*.js', '../lib/*.js'], ['server'])
});
