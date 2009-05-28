
SM.Event = function(name, machine) {
  this.name     = name;
  this.machine  = machine;
  this.guards   = new SM.GuardsCollection();
  return this;
};
	
SM.Event.prototype = {
	transition: function(options){
    this.guards.add(this.name, this.machine.object, options);
    this.machine.states.add([options.from, options.to]);
	  return this;
	},
	can_fire: function(params){
    return this.guards.match(this.name, this.machine.state(), params) ? true : false;
	},
	fire: function(params){
    var transition = this._transition_for(params);
    if( transition ){
      return transition.perform();
    }
    else{
      // transition failed
      return false;
    }
	},
	/* Private methods */
	_transition_for: function(params){
	  if(this.can_fire(params)){
      var from  = this.machine.state();
      var to    = this.guards.find_to_state(this.name, from, params);
      return new SM.Transition(this.machine, this, from, to, params);
    }
    else{
      return false;
    }
	}
};
