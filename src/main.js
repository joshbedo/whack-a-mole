require('./plugins');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

var Application = require('src/application/application');

var app = new Application();

app.module('game', {
  moduleClass: require('src/game/module'),
  container: app.layout.content
});

Backbone.history.start();