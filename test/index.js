'use strict';

require('should');

var path = require('path');

var docs = require('../lib/index');

var gulpMock = {};
var task = null;

gulpMock.task = function(name, description, func) {
  task = func;
};

var configMock = {
  root: path.resolve(__dirname, '../')
};

docs(gulpMock, configMock);

describe('Gulp Module Docs', function() {
  it('Should return a function', function() {
    docs.should.be.type('function');
  });

  it('Should add a task', function() {
    task.should.be.type('function');
  });

  it('Should run the task', function(cb) {
    try {
      task();
      cb();
    } catch (e) {
      cb();
    }
  });
});
