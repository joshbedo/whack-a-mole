var Radio = require('backbone.radio');
var Module = require('src/common/module');
var View = require('./view');

// Game board collection view and collection
var Model = require('./mole/model');
var Collection = require('./mole/collection');
var CollectionView = require('./board/collection-view');

var prevMole,
    prevScore = 0,
    level = 1,
    speed = 1100;

module.exports = Module.extend({
	initialize: function() {
		console.log('game module has started');
		this.container = this.options.container;
		this.collection = new Collection();
		this.channel = Radio.channel('game');
		this.start();
	},

	onStart: function() {
		this.container.show(new View());

		this.channel.comply({
			startGame: this.startGame,
			increaseScore: this.increaseScore
		}, this);
	},

	onStop: function() {
		this.channel.stopComplying();
	},

	startGame: function() {
		for (var i = 0; i < (5 * 4 + 1); i++) {
			this.collection.add(new Model({ mid: i }));
		}

		this.view = new CollectionView({
			collection: this.collection
		});

		this.container.show( this.view );
		this.timer = setInterval(this.renderMole.bind(this), speed);
	},

	increaseScore: function() {
		prevScore += 10;

		if (prevScore % 100 === 0) {
			clearInterval(this.timer);
			console.log('leveled up! ', level);
			level++;
			speed -= 100;
			this.timer = setInterval(this.renderMole.bind(this), speed);
		}

		console.log('new score is ', prevScore);
	},

	renderMole: function() {
		if (typeof prevMole !== undefined && prevMole instanceof Model) {
			prevMole.set('active', false);
		}

		prevMole = this.collection.findWhere({ mid: Math.floor((Math.random() * (5 * 4))+1) })
		prevMole.set('active', true);
	}
	
});