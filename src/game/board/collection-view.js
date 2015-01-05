var CollectionView = require('src/common/collection-view'),
		ItemView       = require('../mole/item-view');

module.exports = CollectionView.extend({
	childView: ItemView,
	tagName: 'ul',
	className: 'board'
});