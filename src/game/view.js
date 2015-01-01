var View     = require('src/common/layout-view'),
    template = require('./template.hbs'),
    Radio = require('backbone.radio');

var BoardView = require('./board/collection-view'),
    ScoreView = require('./score/layout-view'),
    ScoreModel = require('./score/model');

module.exports = View.extend({
	template: template,
	className: 'index',

	ui: {
		startBtn: '[data-action="start"]'
	},

	regions: {
		board: '[data-region="board"]',
		scoreBoard: '[data-region="scoreboard"]'
	},

	events: {
		'click @ui.startBtn': 'startGame'
	},

	startGame: function() {
		this.ui.startBtn.hide();
		Radio.command('game', 'startGame');

		this.board.show(new BoardView({ collection: this.collection }));
		this.scoreBoard.show(new ScoreView({ model: new ScoreModel() }));
		// this.board.show(new BoardView({ collection: collection }));
		//this.scoreBoard.show(new ScoreBoardView());
	}
});