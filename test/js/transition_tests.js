
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
      this.car.expects('battery_flat').twice().returns(true, false);
      this.car.expects('car_in_working_order').twice().returns(false, true);
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling', unless: 'battery_flat' });
        });
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear', when: 'car_in_working_order' });
        });
      });
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isFalse(this.car.gear_up());
      Y.Assert.isTrue(this.car.gear_up());
      Y.Assert.areEqual('first_gear', this.car.state);
    },
    testCanSetComplexConditionalTransitions : function () {
		  new Mock(this.car);
      this.car.expects('battery_flat').twice().returns(true, false, false);
      this.car.expects('car_in_working_order').twice().returns(true, false, true);
      
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling', unless: 'battery_flat', when: 'car_in_working_order' });
        });
      });
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isFalse(this.car.start());
      Y.Assert.isTrue(this.car.start());
      Y.Assert.areEqual('idling', this.car.state);
    }
	}));

	return testSuite;
};
