
SM.Transition = function(machine, event, from, to){
  this.machine = machine;
  this.event = event;
  this.from = from;
  this.to = to;
  return this;
}

SM.Transition.prototype = {
	perform: function() {
		// TODO: callbacks
		this.machine.set_state(this.to);
	}
}
