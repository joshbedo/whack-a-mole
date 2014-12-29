var View     = require('src/common/layout-view'),
    template = require('./template.hbs'),
    BoardView = require('./board/collection-view');
    Radio = require('backbone.radio');

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

	onShow: function() {
		// this._createBoard(4, 7);
		// this._createScoreBoard();
	},

	startGame: function() {
		this.ui.startBtn.hide();


		Radio.command('game', 'startGame');
		// this.board.show(new BoardView());
		// this.board.show(new BoardView({ collection: collection }));
		//this.scoreBoard.show(new ScoreBoardView());
	}
	// _createBoard: function(height, width) {
	// 	// var BoardView = require('./board/view');

	// 	debugger;
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