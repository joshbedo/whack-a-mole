var Radio = require('backbone.radio');
    LayoutView = require('src/common/layout-view'),
		template = require('./template.hbs');

var Model = require('./model');

module.exports = LayoutView.extend({
	template: template,
	className: 'scoreboard',

	regions: {
		score: '[data-region="score"]',
		level: '[data-region="level"]'
	},

	initialize: function(options) {
		console.log('scoreboard has been initialized!', options);
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

	// onShow: function() {
	// 	// this._createBoard(4, 7);
	// 	// this._createScoreBoard();
	// },

	// _createBoard: function(height, width) {


	// 	// var span = document.createElement('span'),
	// 	//     li   = document.createElement('li'),
	// 	//     liElements = [];

	// 	// for (var i = 0; i < (height * width); i++) {
	// 	// 	var cloneLi = li.cloneNode(false),
	// 	// 	    cloneSpan = span.cloneNode(false);

	// 	// 	cloneLi.appendChild(cloneSpan);
	// 	// 	this.ui.board.append(cloneLi);
	// 	// 	liElements.push(cloneLi);
	// 	// }
	// },

	// _createScoreBoard: function() {
	// 	this.ui.scoreBoard.append('level 1');
	// }
});