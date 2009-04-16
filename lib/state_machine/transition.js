
SM.Transition = function(machine, event, from, to){
  this.machine = machine;
  this.event = event;
  this.from = from;
  this.to = to;
  return this;
}

SM.Transition.prototype = {
	perform: function() {
		this.before();
		this.machine.set_state(this.to);
		this.after();
		return true;
	},
	before: function() {
	  this.machine.callbacks.run('before', this.to);
	},
	after: function() {
	  this.machine.callbacks.run('after', this.to);
	},
	rollback: function() {
	  this.machine.set_state(this.from);
	}
}
