
jsStateMachineTests.StateMachineTests = function(Y) {
	var testSuite = new Y.Test.Suite("StateMachine");

  // helper methods
  var contains = function (array, match){
	  console.log(array);
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
		
		testShouldReturnAMachineObject : function () {
			Y.Assert.isObject(new SM.StateMachine('state', this.car));
		},
		testShouldSetTheInitialStateAsBlank : function () {
		  new SM.StateMachine('state', this.car);
			Y.Assert.areEqual('', this.car.state());
		},
		testShouldSetTheInitialState : function () {
			new SM.StateMachine('state', this.car, { initial: 'parked' });
			Y.Assert.areEqual('parked', this.car.state());
		},
		testShouldAddNewEventMethods : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
		  this.car.event('start');
		  Y.Assert.isFunction(this.car.start);
		  Y.Assert.isFunction(this.car.can_start);
		},
		testCanGetListOfEvents : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
		  this.car.event('start');
		  this.car.event('gear_up');
		  this.car.event('gear_down');
		  Y.Assert.isTrue(contains(this.car.state_events, 'start'));
		  Y.Assert.isTrue(contains(this.car.state_events, 'gear_up'));
		  Y.Assert.isTrue(contains(this.car.state_events, 'gear_down'));
		},
		testCanGetListOfStates : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
		  this.car.event('start').transition({from: 'parked', to: 'idling'});
		  this.car.event('gear_up').transition({from: 'idling', to: 'first_gear'});
		  this.car.event('gear_down').transition({from: 'first_gear', to: 'idling'});
		  Y.Assert.isTrue(contains(this.car.state_states, 'parked'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'idling'));
		  Y.Assert.isTrue(contains(this.car.state_states, 'first_gear'));
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
		  new SM.StateMachine('state', this.car);
		  new SM.StateMachine('alarm_state', this.car);
			Y.Assert.areEqual('', this.car.state());
			Y.Assert.areEqual('', this.car.alarm_state());
		},
		testShouldSetTheInitialState : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
		  new SM.StateMachine('alarm_state', this.car, { initial: 'active' });
			Y.Assert.areEqual('parked', this.car.state());
			Y.Assert.areEqual('active', this.car.alarm_state());
		},
		testShouldAddNewEventMethods : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
		  this.car.event('start');
		  new SM.StateMachine('alarm_state', this.car, { initial: 'active' });
		  this.car.event('disable');
		  Y.Assert.isFunction(this.car.start);
		  Y.Assert.isFunction(this.car.can_start);
		  Y.Assert.isFunction(this.car.disable);
		  Y.Assert.isFunction(this.car.can_disable);
		},
    testCanGetListOfEvents : function () {
      new SM.StateMachine('state', this.car, { initial: 'parked' });
      this.car.event('start');
      this.car.event('gear_up');
      this.car.event('gear_down');
      new SM.StateMachine('alarm_state', this.car, { initial: 'parked' });
      this.car.event('enable');
      this.car.event('disable');
      this.car.event('alarm');
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
