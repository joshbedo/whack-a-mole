var CollectionView = require('src/common/collection-view'),
		ItemView       = require('../mole/item-view');

module.exports = CollectionView.extend({
	childView: ItemView,
	tagName: 'ul',
	className: 'board',

	initialize: function(options) {
		debugger
		console.log('board game has been initialized!', options);
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