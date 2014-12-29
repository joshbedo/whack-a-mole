var LayoutView = require('src/common/layout-view'),
    template   = require('./layout-template.hbs');

module.exports = LayoutView.extend({
	el: '.application',
	template: template,

	regions: {
		content: '.application__content'
	}
});