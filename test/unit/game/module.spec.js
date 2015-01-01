describe('game/module', function() {
	beforeEach(function() {
		this.collection = { findWhere: stub() };
		this.collectionView = { collectionView: true };

		this.Collection = stub().returns(this.collection);
		this.CollectionView = stub().returns(this.collectionView);

		this.container = { show: stub() };

		this.Module = proxyquire('src/game/module.js', {
			'./collection': this.Collection,
			'./collection-view': this.CollectionView
		});

		this.module = new this.Module('game', {}, { container: this.container });
	});

	describe('#initialize', function() {
		beforeEach(function() {
			stub(this.module, 'start');
			this.module.initialize({ container: this.container });
		});

		// it('should attach a container', function() {
		// 	expect(true).to.be(false);
		// });
	});

});