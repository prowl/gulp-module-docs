'use strict';

var exec = require('child_process').exec;
var path = require('path');

// this variable is just used to store a local reference to the configuration object
var config = null;

/**
 * Adds the documentation generation task to gulp
 *
 * @param {Object} gulp the instance of gulp to attach the task to
 * @param {Object} conf The configuration Object
 */
function docsSetup(gulp, conf) {
  // assign the configuration object to a local so the task has access to it
  config = conf;

  // add the task to gulp
  gulp.task('docs', false, docsTask);
}

/**
 * Executes the documentation generation command passing in the proper parameters
 *
 */
function docsTask() {
  // read the application name from the modules package.json file
  var packageJson = require(path.resolve(config.root, 'package.json'));
  var appName = packageJson.name;

  // set the template path to the override that we use
  var templatePath = path.resolve(__dirname, '../templates/docs.jade');

  // determine the doc path
  var docPath = path.resolve(config.root, 'docs');

  // set the path to the files we're documenting (all modules should follow this scheme)
  var libPath = path.resolve(config.root, 'lib');

  // localize the path to the binary we're executing
  var cmdPath = path.resolve(__dirname, '../node_modules/.bin');

  // build up the command string
  var cmd = cmdPath + '/doxx';
  cmd += ' -t ' + appName; // set the title
  cmd += ' -T ' + docPath; // set the output directory
  cmd += ' --template ' + templatePath; // set the template to our custom template
  cmd += ' -s ' + libPath; // set the path to the library

  exec(cmd, execCallback);
}

/**
 * Handles the output recieved from the execute command
 *
 * @param {Object} err Any error that occured while executing the command
 * @param {Buffer} stdout The stdout given back by the executable
 * @param {Buffer} stderr The stderr given back by the executable
 */
function execCallback(err, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);

  if (err) {
    throw err;
  }
}

// export our setup function
module.exports = docsSetup;
