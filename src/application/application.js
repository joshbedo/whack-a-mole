var $ = require('jquery');
var Radio = require('backbone.radio');
var Application = require('src/common/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
	initialize: function() {
		this.$body = $(document.body);
		this.layout = new LayoutView();
		this.layout.render();
	}
});