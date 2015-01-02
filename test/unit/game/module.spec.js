describe('game/module', function() {
	beforeEach(function() {
		this.collection = { collection: true, add: stub() };
		this.view = { view: true };
		this.model = { model: true }

		this.Collection = stub().returns(this.collection);
		this.Model = stub().returns(this.model);
		this.View = stub().returns(this.view);

		this.container = { show: stub() };

		this.Module = proxyquire('src/game/module.js', {
			'./mole/model': this.Model,
			'./mole/collection': this.Collection,
			'./view': this.View
		});

		this.module = new this.Module('game', {}, { container: this.container });
	});

	describe('#initialize', function() {
		beforeEach(function() {
			stub(this.module, 'start');
			this.module.initialize({ container: this.container });
		});

		it('should attach a container', function() {
			expect(this.module).to.have.ownProperty('container', this.container);
		});

		it('should create a collection of moles', function() {
			expect(this.Collection).to.have.been.calledWithNew;
			expect(this.module).to.have.ownProperty('collection', this.collection);
		});

		it('should create the game view', function() {
			expect(this.View).to.have.been.calledWithNew.and.calledWith({
				collection: this.collection
			});
		});
	});

	describe('#renderMole', function() {
		beforeEach(function() {

		});

		// it('should choose a random mole and set attribute to true', function() {
		// })
	});

});