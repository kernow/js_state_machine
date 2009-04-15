
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
    }
	}));

	return testSuite;
};
