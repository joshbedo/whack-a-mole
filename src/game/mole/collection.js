var Collection = require('src/common/collection');
var Model = require('./model');

module.exports = Collection.extend({
	model: Model,

	initialize: function(options) {
		console.log('collection has been initilaized');
		// debugger;
		// return this;
	}
});