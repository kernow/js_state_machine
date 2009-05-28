
jsStateMachineTests.TransitionTests = function(Y) {
	var testSuite = new Y.Test.Suite("Transition");

	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		testCanSetConditionalTransitions : function () {
		  new Mock(this.car);
      this.car.expects('battery_flat').times(3).returns(true, false);
      this.car.expects('car_in_working_order').times(3).returns(false, true);
      
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', function(event){
          event.transition({ from: 'parked', to: 'idling', unless: event.machine.object.battery_flat });
        });
        machine.event('gear_up', function(event){
          event.transition({ from: 'idling', to: 'first_gear', when: event.machine.object.car_in_working_order });
        });
      });
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isFalse(this.car.gear_up());
      Y.Assert.isTrue(this.car.gear_up());
      Y.Assert.areEqual('first_gear', this.car.state);
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testAnyTransition : function () {
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('crash', function(event){
          event.transition({ from: 'any', to: 'crashed' });
        });
        machine.event('start', function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('repair', function(event){
          event.transition({ from: 'crashed', to: 'parked' });
        });
      });
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.crash());
      Y.Assert.areEqual('crashed', this.car.state);
      Y.Assert.isTrue(this.car.repair());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isTrue(this.car.crash());
      Y.Assert.areEqual('crashed', this.car.state);
    },
    testExceptTransitions : function () {
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('crash', function(event){
          event.transition({ from: 'any', to: 'crashed', except: 'parked_in_garage' });
        });
        machine.event('start', function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('repair', function(event){
          event.transition({ from: 'crashed', to: 'parked' });
        });
        machine.event('park_in_garage', function(event){
          event.transition({ from: 'any', to: 'parked_in_garage' });
        });
      });
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.crash());
      Y.Assert.areEqual('crashed', this.car.state);
      Y.Assert.isTrue(this.car.repair());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isTrue(this.car.crash());
      Y.Assert.areEqual('crashed', this.car.state);
      Y.Assert.isTrue(this.car.repair());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.park_in_garage());
      Y.Assert.areEqual('parked_in_garage', this.car.state);
      Y.Assert.isFalse(this.car.crash());
      Y.Assert.areEqual('parked_in_garage', this.car.state);
    },
    testConditionCallbacksRecieveParameters : function () {
		  new Mock(this.car);
      this.car.expects('battery_flat').twice().passing(1,2,3,4).returns(false);
      this.car.expects('car_in_working_order').twice().passing(1,2,3,4).returns(true);
      
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', function(event){
          event.transition({  from: 'parked',
                              to: 'idling',
                              unless: event.machine.object.battery_flat,
                              when: event.machine.object.car_in_working_order });
        });
      });
      Y.Assert.isTrue(this.car.start(1,2,3,4));
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanSetComplexConditionalTransitions : function () {
		  new Mock(this.car);
      this.car.expects('battery_flat').times(3).returns(true, false, false);
      this.car.expects('car_in_working_order').times(4).returns(true, false, true);
      
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', function(event){
          event.transition({  from: 'parked',
                              to: 'idling',
                              unless: event.machine.object.battery_flat,
                              when: event.machine.object.car_in_working_order });
        });
      });
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    },
    testCanTransitionFromAndToTheSameState : function () {
      new Mock(this.car);
      this.car.expects('open_close_door').twice();
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        
        machine.before_transition({ on: 'get_out', run: machine.object.open_close_door });
        machine.before_transition({ on: 'get_in', run: machine.object.open_close_door });
        
        machine.event('get_out', function(event){
          event.transition({ from: 'parked', to: 'parked' });
        });
        machine.event('get_in', function(event){
          event.transition({ from: 'parked', to: 'parked'});
        });
        machine.event('start', function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      Y.Assert.isFalse(this.car.stop());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.get_in());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isFalse(this.car.get_out());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isTrue(this.car.stop());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.get_out());
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.isTrue(this.car.jsmocha.verify(), this.car.jsmocha.report());
    }
	}));

	return testSuite;
};
