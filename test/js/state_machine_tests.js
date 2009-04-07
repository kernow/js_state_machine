
jsStateMachineTests.MockTests = function(Y) {
	var testSuite = new Y.Test.Suite("StateMachine");

	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
			this.state_machine = new StateMachine();
		},
		
		tearDown : function () { 
			delete this.state_machine;
		},
		
		testShouldHaveVerifyMethod : function () {
			Y.Assert.isFunction(this.mock.jsmocha.verify);
		},
		
		testShouldReturnExpectedValues : function () {
			this.mock.expects('return_string').returns('string');
			Y.Assert.areEqual('string', this.mock.return_string());
			
			var array = new Array(1,2,3,4);
			this.mock.expects('return_array').returns(array);
			Y.Assert.areEqual(array, this.mock.return_array());
			
			var obj = {data: 'string'};
			this.mock.expects('return_object').returns(obj);
			Y.Assert.areEqual(obj, this.mock.return_object());
		}
	}));

	return testSuite;
};
