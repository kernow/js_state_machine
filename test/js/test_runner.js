/**
 * This is the test runner
**/
var jsStateMachineTests = {};
// Create new YUI instance, and populate it with the required modules
YUI().use("console", "yuitest", function(Y) {
	var yconsole = new Y.Console({
		newestOnTop: false                   
	});
	yconsole.render('#testLogger');
	Y.Test.Runner.add(jsStateMachineTests.StateMachineTests(Y));
	Y.Test.Runner.run();
});
