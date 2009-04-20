
SM.Callback = function(options, machine, block) {
  this.options  = options;
  this.machine  = machine;
  this.block    = block;
  return this;
};
	
SM.Callback.prototype = {
  match: function(state) {
    return this.options.to == state ? true : false;
  },
  run: function() {
    if(this.block){ this.block(); }
    if(this.options.run){ this.machine.object[this.options.run](); }
  }
};
