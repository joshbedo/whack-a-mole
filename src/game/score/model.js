var _ = require('lodash');
var Backbone = require('backbone');
var Model = require('src/common/model');
var Radio = require('backbone.radio');

module.exports = Model.extend({
	defaults: {
		level: 1,
		score: 0
	},

	increaseScore: function() {
		var prevScore = this.get('score'),
		    prevLevel = this.get('level');

		this.set('score', prevScore + 10);

		if (this.get('score') % 100 === 0) {
			this.set('level', prevLevel+1);
			Radio.command('game', 'levelup');
		}
	}

});