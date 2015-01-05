var Radio = require('backbone.radio');
var Module = require('src/common/module');
var View = require('./view');

var Model = require('./mole/model');
var Collection = require('./mole/collection');

var prevMole,
    prevScore = 0,
    level = 1,
    speed = 1100;

module.exports = Module.extend({
	initialize: function() {
		this.container = this.options.container;
		this.collection = new Collection();
		this.channel = Radio.channel('game');
		this.start();
	},

	onStart: function() {
		this._showGameBoard();
		this._bindChannelCommands();
	},

	onStop: function() {
		this.channel.stopComplying();
	},

	startGame: function() {
		this.timer = setInterval(this.renderMole.bind(this), speed);
	},

	levelUp: function() {
		clearInterval(this.timer);
		speed -= 100;
		this.timer = setInterval(this.renderMole.bind(this), speed);
	},

	renderMole: function() {
		if (typeof prevMole !== undefined && prevMole instanceof Model) {
			prevMole.set('active', false);
		}

		prevMole = this.collection.findWhere({ mid: Math.floor((Math.random() * (5 * 4))+1) })
		prevMole.set('active', true);
	},

	_showGameBoard: function() {
		for (var i = 0; i < (5 * 4 + 1); i++) {
			this.collection.add(new Model({ mid: i }));
		}

		this.container.show(new View({ collection: this.collection }));
	},

	_bindChannelCommands: function() {
		this.channel.comply({
			startGame: this.startGame,
			levelup: this.levelUp
		}, this);
	}
	
});