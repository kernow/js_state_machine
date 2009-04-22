
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
		
    testCanRegisterBeforeTransitionWithTo : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({ to: 'idling', run: machine.object.turn_on_radio });
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterBeforeTransitionWithFrom : function () {
      new Mock(this.car);
      this.car.expects('check_mirror');
      
      new SM.StateMachine('state', this.car, { initial: 'idling' }, function(machine){
        
        machine.before_transition({ from: 'idling', run: machine.object.check_mirror });
        
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
        });
      });
      this.car.gear_up();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterBeforeTransitionWithOn : function () {
      new Mock(this.car);
      this.car.expects('check_mirror');
      
      new SM.StateMachine('state', this.car, { initial: 'idling' }, function(machine){
        
        machine.before_transition({ on: 'gear_up', run: machine.object.check_mirror });
        
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
        });
      });
      this.car.gear_up();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterAfterTransitionWithTo : function () {
      new Mock(this.car);
      this.car.expects('open_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.after_transition({ to: 'idling', run: machine.object.open_sunroof });
        
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
      });
      this.car.start();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterAfterTransitionWithFrom : function () {
      new Mock(this.car);
      this.car.expects('light_cigarette');
      
      new SM.StateMachine('state', this.car, { initial: 'idling' }, function(machine){
        
        machine.before_transition({ from: 'idling', run: machine.object.light_cigarette });
        
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
        });
      });
      this.car.gear_up();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterAfterTransitionWithOn : function () {
      new Mock(this.car);
      this.car.expects('light_cigarette');
      
      new SM.StateMachine('state', this.car, { initial: 'idling' }, function(machine){
        
        machine.before_transition({ on: 'gear_up', run: machine.object.light_cigarette });
        
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
        });
      });
      this.car.gear_up();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterAfterTransitionWithFromAndTo : function () {
      new Mock(this.car);
      this.car.expects('check_mirror');
      this.car.expects('light_cigarette').never();
      
      new SM.StateMachine('state', this.car, { initial: 'idling' }, function(machine){
        
        machine.before_transition({ from: 'idling', to: 'first_gear', run: machine.object.check_mirror });
        machine.before_transition({ from: 'first_gear', to: 'second_gear', run: machine.object.light_cigarette });
        
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
        });
        machine.event('gear_up_2', {}, function(event){
          event.transition({ from: 'first_gear', to: 'third_gear' });
        });
      });
      this.car.gear_up();
      this.car.gear_up_2();
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanRegisterBeforeAndAfterTransition : function () {
      new Mock(this.car);
      this.car.expects('turn_on_radio');
      this.car.expects('open_sunroof');
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({to: 'idling', run: machine.object.turn_on_radio });
        machine.after_transition({to: 'idling', run: machine.object.open_sunroof });
        
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
        
        machine.before_transition({to: 'idling', run: machine.object.turn_on_radio });
        machine.before_transition({to: 'parked', run: machine.object.turn_off_radio });
        
        machine.after_transition({to: 'idling', run: machine.object.open_sunroof });
        machine.after_transition({to: 'parked', run: machine.object.close_sunroof });
        
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
        
        machine.before_transition({to: 'idling', run: machine.object.turn_on_radio });
        machine.before_transition({to: 'parked', run: machine.object.turn_off_radio });
        
        machine.after_transition({to: 'idling', run: machine.object.open_sunroof });
        machine.after_transition({to: 'parked', run: machine.object.close_sunroof });
        
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
        machine.before_transition({to: 'parked', run: machine.object.close_sunroof }, function(){
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
	
	testSuite.add(new Y.Test.Case({
		
		name: "passed parameters",
		
		setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		
    testCanPassParametersToCallback : function () {
      new Mock(this.car);
      this.car.expects('tune_radio_if_passed').passing('radio 1');
      
      new SM.StateMachine('radio_state', this.car, { initial: 'off' }, function(machine){
        
        machine.after_transition({ to: 'on', run: machine.object.tune_radio_if_passed }, function(){
          Y.Assert.areEqual('radio 1', arguments[0]);
        });
        
        machine.event('turn_on_radio', {}, function(event){
          event.transition({ from: 'off', to: 'on' });
        });
      });
      this.car.turn_on_radio('radio 1');
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    }
	}));

	return testSuite;
};
