
jsStateMachineTests.EventTests = function(Y) {
	var testSuite = new Y.Test.Suite("Event");

	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		
    testCanCheckIfEventCanBeFired : function () {
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', {}, function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      Y.Assert.isTrue(this.car.can_start());
      Y.Assert.isFalse(this.car.can_stop());
    },
    
    testCanFireAndEvent : function () {
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', {}, function(event){
          event.transition({ from: 'idling', to: 'parked' });
        });
      });
      this.car.start();
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isFalse(this.car.can_start());
      Y.Assert.isTrue(this.car.can_stop());
    },
    testCanSupportMultipleFromStatesAsArray : function () {
      new SM.StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start', {}, function(event){
          event.transition({ from: 'parked', to: 'idling' });
        });
        machine.event('stop', {}, function(event){
          event.transition({ from: ['idling', 'first_gear', 'second_gear', 'third_gear'], to: 'parked' });
        });
        machine.event('gear_up', {}, function(event){
          event.transition({ from: 'idling', to: 'first_gear' });
          event.transition({ from: 'first_gear', to: 'second_gear' });
          event.transition({ from: 'second_gear', to: 'third_gear' });
        });
      });
      this.car.start();
      Y.Assert.areEqual('idling', this.car.state);
      Y.Assert.isTrue(this.car.can_stop());
      Y.Assert.isTrue(this.car.can_gear_up());
      this.car.gear_up();
      Y.Assert.areEqual('first_gear', this.car.state);
      this.car.gear_up();
      Y.Assert.areEqual('second_gear', this.car.state);
      Y.Assert.isTrue(this.car.can_stop());
      this.car.stop();
      Y.Assert.areEqual('parked', this.car.state);
    }
	}));

	return testSuite;
};
