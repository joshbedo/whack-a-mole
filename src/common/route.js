var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Marionette.Object.extend({
	constructor: function() {
		this.initialize.apply(this, arguments);
	},

	_triggerMethod: function(name, args) {
		if (this.router) {
			this.router.triggerMethod.apply(
				this.router,
				[name + ':route'].concat(args)
			);
		}
		this.triggerMethod.apply(this, [name].concat(args));
	},

	enter: function(args) {
		var self = this;
		this._triggerMethod('before:enter', args);
		// We don't need this for the Whack-A-Mole example but it's useful for fetching data between page changes
		// this._triggerMethod('before:fetch', args);

		// render then trigger events
		self.render.apply(self, args);
		self._triggerMethod('render', args);
		self._triggerMethod('enter', args);
	},

	navigate: function() {
		Backbone.history.navigate.apply(Backbone.history, arguments);
	},

	fetch: function() {},
	render: function() {}
});