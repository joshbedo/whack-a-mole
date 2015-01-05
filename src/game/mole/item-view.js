var ItemView = require('src/common/item-view'),
    template = require('./template.hbs');

module.exports = ItemView.extend({
	template: template,
	tagName: 'li',

	modelEvents: {
		'change:active': function(model) {
			if (model.get('active') === false) {
				this.destroyMole(); 
			} else {
				this.activateMole();
			}
		}
	},

	events: {
		'click span': 'destroyMole'
	},

	activateMole: function() {
		this.$el.addClass('mole');
	},

	destroyMole: function() {
		if (this.$el.hasClass('mole')) {
			this.$el.removeClass('mole');
		}
	}

});