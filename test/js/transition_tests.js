
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
		
		testCanAddTransition : function () {
		  new SM.StateMachine('state', this.car, { initial: 'parked' });
      Y.Assert.isObject( this.car.event('start')
                            .transition({ from:'parked', to:'idling' })
      );
      Y.Assert.isObject( this.car.event('start')
                            .transition({ from:'parked', to:'idling' })
                            .transition({ from:'idling', to:'parked' })
      );
		}
	}));

	return testSuite;
};
