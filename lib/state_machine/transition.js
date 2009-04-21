
SM.Transition = function(machine, event, from, to){
  this.machine = machine;
  this.event = event;
  this.from = from;
  this.to = to;
  return this;
};

SM.Transition.prototype = {
	perform: function() {
		this.before();
		this.machine.set_state(this.to);
		this.after();
		return true;
	},
	before: function() {
	  this.machine.callbacks.run('before', this.from, this.to, this.event);
	},
	after: function() {
	  this.machine.callbacks.run('after', this.from, this.to, this.event);
	},
	rollback: function() {
	  this.machine.set_state(this.from);
	}
};
