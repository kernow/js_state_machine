var SM = {};

SM.StateMachine = function (name, object, options) {
  
  // options: initial - the initial state
  //          action  - a callback to run on every transition

	return new SM.Machine(name, object, options);
}
