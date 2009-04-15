var SM = {};

// options: initial - the initial state
//          action  - a callback to run on every transition

SM.StateMachine = function (name, object, options, block) {
	return new SM.Machine(name, object, options, block);
}
