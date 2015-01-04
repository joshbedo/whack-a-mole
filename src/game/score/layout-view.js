var Radio = require('backbone.radio');
    LayoutView = require('src/common/layout-view'),
		template = require('./template.hbs');

module.exports = LayoutView.extend({
	template: template,
	className: 'scoreboard',

	regions: {
		score: '[data-region="score"]',
		level: '[data-region="level"]'
	},

	initialize: function(options) {
		this.channel = Radio.channel('game');
		
		this.channel.comply({
			increaseScore: this.increaseScore
		}, this);

		this.model = options.model;
		this.model.on('change', this.render, this);
	},

	increaseScore: function() {
		this.model.increaseScore();
	},

	serializeData: function() {
		return {
			"score": this.model.get('score'),
			"level": this.model.get('level')
		}
	}
});