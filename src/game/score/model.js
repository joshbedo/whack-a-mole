var _ = require('lodash');
var Backbone = require('backbone');
var Model = require('src/common/model');

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
			// clearInterval(this.timer);
			this.set('level', prevLevel+1);
			console.log('leveled up! ', this.get('level'));
			// speed -= 100;
			// this.timer = setInterval(this.renderMole.bind(this), speed);
		}

		console.log('new score is ', this.get('score'));
	}

});