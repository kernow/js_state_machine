
SM.Event = function(name, machine, options) {
  this.name     = name;
  this.machine  = machine;
  this.options  = options;
  this.guards   = new SM.GuardsCollection();
  return this;
}
	
SM.Event.prototype = {
	transition: function(options){
    this.guards.add(this.name, options);
    this.machine.states.add([options.from, options.to]);
	  return this;
	},
	can_fire: function(){
    return this.guards.match(this.name, this.machine.state()) ? true : false;
	},
	fire: function(){
    var transition = this.transition_for();
    if( transition ){
      transition.perform();
    }
    else{
      // transition failed
      console.log("********* transition failed");
    }
	},
	transition_for: function(){
	  if(this.can_fire()){
      var from  = this.machine.state();
      var to    = this.guards.find_to_state(this.name, from);
      return new SM.Transition(this.machine, this, from, to);
    }
    else{
      return false;
    }
	}
}
