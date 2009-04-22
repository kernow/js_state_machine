
SM.Callback = function(options, machine, block) {
  this.options  = options;
  this.machine  = machine;
  this.block    = block;
  return this;
};
	
SM.Callback.prototype = {
  match: function(from_state, to_state, event) {
    if( this.options.to && this.options.from ) {
      if( this.options.to == to_state && this.options.from == from_state ){
        return true;
      }
      else{
        return false;
      }
    }
    if( this.options.to == to_state ){
      return true;
    }
    if( this.options.from == from_state ){
      return true;
    }
    if( this.options.on == event.name ){
      return true;
    }
    return false;
  },
  run: function(params) {
    if(this.block){ this.block.apply(this, params); }
    if(this.options.run){ this.machine.object[this.options.run].apply(this, params); }
  }
};
