var Backbone = require('backbone');
var Radio = require('backbone.radio');

var gameChannel = Radio.channel('game');

module.exports = Backbone.Model.extend({
	constructor: function() {
		Backbone.Model.apply(this, arguments);
		// this would be useful if we were requesting data from endpoints
		// this.on('request', this.handleRequest);
		// this.on('error', this.handleError);
	},

	handleRequest: function() {
		gameChannel.command('add', { id: 2, name: 'test' });
	}
})