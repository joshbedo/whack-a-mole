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

	describe('#onStart', function() {
		beforeEach(function() {
			this.module.onStart();
		});

		it('should create a view and pass the collection', function() {
			expect(this.View).to.have.been.calledWith({
				collection: this.collection
			});
		});

		it('should show the view inside the container', function() {
			expect(this.container.show).to.have.been.calledWith(this.view);
		});

		it('should bind commands on the channel', function() {
			this.gameChannel = Backbone.Radio.channel('game');
			stub(this.gameChannel, 'comply');
			this.module._bindChannelCommands();

			expect(this.gameChannel.comply).to.have.been.called;
		});
	});

	describe('#onStop', function() {
		beforeEach(function() {
			this.gameChannel = Backbone.Radio.channel('game');
			stub(this.gameChannel, 'stopComplying');
			this.module.onStop();
		});

		it('should clear the commands on the channel', function() {
			expect(this.gameChannel.stopComplying).to.have.been.called;
		});
	});

	// describe('#startGame', function() {
	// 	beforeEach(function() {
	// 		stub(this.timer, new Date())
	// 	});

	// 	it('should start a timer and call #renderMole', function() {
			
	// 	})
	// })



});