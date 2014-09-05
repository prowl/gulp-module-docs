'use strict';

var gulp = require('gulp');

var paths = {
  root: __dirname,
  soften: ['**/*.js', '**/*.json', '!./node_modules/**', '!./docs/**'],
  src: ['**/*.js', '!./node_modules/**', '!./docs/**'],
  specs: ['specs/**/*.js'],
  statements_threshold: 80,
  functions_threshold: 65,
  branches_threshold: 0,
  lines_threshold: 80
};

require('gulp-module')(gulp, paths);
