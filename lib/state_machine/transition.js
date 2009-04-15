
SM.Transition = function(machine, event, from, to){
  console.log("machine state: "+machine.state);
  console.log("event: "+event);
  console.log("from: "+from);
  console.log("to: "+to);
  this.machine = machine;
  this.event = event;
  this.from = from;
  this.to = to;
  return this;
}

SM.Transition.prototype = {
	perform: function() {
	  console.log("machine state: "+this.machine.state);
		// do the transition with all the before and after callbacks
		this.machine.set_state(this.to);
	}
}
