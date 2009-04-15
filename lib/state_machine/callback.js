
SM.Callback = function(options, machine, block) {
  this.options  = options;
  this.machine  = machine;
  this.block    = block;
  return this;
}
	
SM.Callback.prototype = {
  run: function() {
    console.log("running a callback");
  },
  match: function(state) {
    return this.options.to == state ? true : false;
  },
  run: function() {
    if(this.block){ this.block() };
    if(this.options.do){ this.machine.object[this.options.do]() };
  }
}
