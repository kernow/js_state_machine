
jsStateMachineTests.CallbackTests = function(Y) {
	var testSuite = new Y.Test.Suite("Callback");

	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		
    testCanRegisterBeforeTransition : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling', run: 'turn_on_radio'});
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterAfterTransition : function () {
      new Mock(this.car);
      this.car.expects('open_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.after_transition({to: 'idling', run: 'open_sunroof'});
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterBeforeAndAfterTransition : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      this.car.expects('open_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling', run: 'turn_on_radio'});
        machine.after_transition({to: 'idling', run: 'open_sunroof'});
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testOnlyMatchedCallbacksAreRun : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      this.car.expects('turn_off_radio').never();
      this.car.expects('open_sunroof');
      this.car.expects('close_sunroof').never();
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling', run: 'turn_on_radio'});
        machine.before_transition({to: 'parked', run: 'turn_off_radio'});
        
        machine.after_transition({to: 'idling', run: 'open_sunroof'});
        machine.after_transition({to: 'parked', run: 'close_sunroof'});
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', {}, function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testMultipleCallbacksAreRun : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      this.car.expects('turn_off_radio');
      this.car.expects('open_sunroof');
      this.car.expects('close_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling', run: 'turn_on_radio'});
        machine.before_transition({to: 'parked', run: 'turn_off_radio'});
        
        machine.after_transition({to: 'idling', run: 'open_sunroof'});
        machine.after_transition({to: 'parked', run: 'close_sunroof'});
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', {}, function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      this.car.start();
      this.car.stop();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterCallbackBlock : function () {
      callback_checker = new Mock();
      callback_checker.expects('turn_on_radio');
      callback_checker.expects('turn_off_radio');
      
      new Mock(this.car);
      this.car.expects('close_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling'}, function(){
          callback_checker.turn_on_radio();
        });
        machine.before_transition({to: 'parked', run: 'close_sunroof'}, function(){
          callback_checker.turn_off_radio();
        });
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        
        machine.event('stop', {}, function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      this.car.start();
      this.car.stop();
      Y.Assert.isTrue(callback_checker.jsmocha.verify(), callback_checker.jsmocha.report());
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
      delete callback_checker;
    },
	}));

	return testSuite;
};
