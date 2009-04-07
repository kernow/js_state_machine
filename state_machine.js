
function StateMachine(name, options) {
  
  // options: initial - the initial state
  //          action  - a callback to run on every transition
  //          
  
	return new Machine(name, options);
} 

StateMachine.prototype = {
	reservedNames: ['expects', 'jsmocha'],
	
	already_mocked: function(object) {
		return object.jsmocha ? true : false;
	}
}
