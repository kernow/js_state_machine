
jsStateMachineTests.StateMachineTests = function(Y) {
	var testSuite = new Y.Test.Suite("StateMachine");

  // helper methods
  var contains = function (array, match){
	  for(var i=0; i < array.length; i++){
	    if(array[i].name == match){
	      return true;
	    }
    }
    return false;
	};
	
	

	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		
		testShouldSetTheInitialStateAsBlank : function () {
		  new StateMachine('state', this.car);
			Y.Assert.areEqual('', this.car.state);
		},
		testShouldSetTheInitialState : function () {
			new StateMachine('state', this.car, { initial: 'parked' });
			Y.Assert.areEqual('parked', this.car.state);
		},
		testShouldAddNewEventMethods : function () {
		  new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
		    machine.event('start');
		  });
		  Y.Assert.isFunction(this.car.start);
		  Y.Assert.isFunction(this.car.can_start);
		},
		testCanGetListOfEvents : function () {
		  new StateMachine('state', this.car, { initial: 'parked' });
		  new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
		    machine.event('start');
		    machine.event('gear_up');
		    machine.event('gear_down');
		  });
		  Y.Assert.isTrue(contains(this.car.state_events, 'start'));
		  Y.Assert.isTrue(contains(this.car.state_events, 'gear_up'));
		  Y.Assert.isTrue(contains(this.car.state_events, 'gear_down'));
		},
		testCanGetListOfStates : function () {
		  new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
		    machine.event('start', {}, function(event){
		      event.transition({from: 'parked', to: 'idling'});
		    });
		    machine.event('gear_up', {}, function(event){
		      event.transition({from: 'idling', to: 'first_gear'});
		    });
		    machine.event('gear_down', {}, function(event){
		      event.transition({from: 'first_gear', to: 'idling'});
		    });
		  });
		  Y.Assert.isTrue(contains(this.car.state_states, 'parked'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'idling'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'first_gear'));
		},
		testCanGetListOfStatesUsingFromStatesAsArray : function () {
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
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
      Y.Assert.isTrue(contains(this.car.state_states, 'parked'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'idling'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'first_gear'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'second_gear'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'third_gear'));
    }
	}));
	
	testSuite.add(new Y.Test.Case({
	  
	  name: "multiple state machines on same object",
	  
	  setUp : function () {
		  this.car = {};
		},
		
		tearDown : function () {
		  delete this.car;
		},
		
		testShouldSetTheInitialStateAsBlank : function () {
		  new StateMachine('state', this.car);
		  new StateMachine('alarm_state', this.car);
			Y.Assert.areEqual('', this.car.state);
			Y.Assert.areEqual('', this.car.alarm_state);
		},
    testShouldSetTheInitialState : function () {
      new StateMachine('state', this.car, { initial: 'parked' });
      new StateMachine('alarm_state', this.car, { initial: 'active' });
      Y.Assert.areEqual('parked', this.car.state);
      Y.Assert.areEqual('active', this.car.alarm_state);
    },
    testShouldAddNewEventMethods : function () {
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start');
      });
      
      new StateMachine('alarm_state', this.car, { initial: 'active' }, function(machine){
        machine.event('disable');
      });
      Y.Assert.isFunction(this.car.start);
      Y.Assert.isFunction(this.car.can_start);
      Y.Assert.isFunction(this.car.disable);
      Y.Assert.isFunction(this.car.can_disable);
    },
    testCanGetListOfEvents : function () {
      new StateMachine('state', this.car, { initial: 'parked' }, function(machine){
        machine.event('start');
        machine.event('gear_up');
        machine.event('gear_down');
      });
      new StateMachine('alarm_state', this.car, { initial: 'parked' }, function(machine){
        machine.event('enable');
        machine.event('disable');
        machine.event('alarm');
      });
      Y.Assert.isTrue(contains(this.car.state_events, 'start'));
      Y.Assert.isTrue(contains(this.car.state_events, 'gear_up'));
      Y.Assert.isTrue(contains(this.car.state_events, 'gear_down'));
      Y.Assert.isTrue(contains(this.car.alarm_state_events, 'enable'));
      Y.Assert.isTrue(contains(this.car.alarm_state_events, 'disable'));
      Y.Assert.isTrue(contains(this.car.alarm_state_events, 'alarm'));
    }
	}));

	return testSuite;
};
