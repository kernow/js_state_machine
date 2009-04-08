
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
		  new SM.StateMachine('state', this.car, { initial: 'idle' });
      Y.Assert.isObject( this.car.event('start')
                            .transition({ from:'idle', to:'running' })
      );
      Y.Assert.isObject( this.car.event('start')
                            .transition({ from:'idle', to:'running' })
                            .transition({ from:'running', to:'idle' })
      );
		}
	}));

	return testSuite;
};
