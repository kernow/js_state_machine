
SM.Machine = function(name, object, options) {
  this.events = new SM.EventCollection();
  this.states = new SM.StateCollection();
  
  this.state = options && options.initial ? options.initial : '';
  this.add_methods_to_object(object, name);
  return this;
}

SM.Machine.prototype = {
  
	add_methods_to_object: function(object, name){
	  object.state_machine    = this;
	  object[name]            = function(){ return this.state_machine.get_state() };
	  object[name+'_events']  = this.events.all();
	  object[name+'_states']  = this.states.all();
	  object.event            = this.event;
	},
	event: function(name, options) {
		// creates an event
		var event = this.state_machine.events.add(name, this.state_machine, options);
	  this.state_machine.add_event_methods(name, this, event);
	  return event;
	},
	add_event_methods: function(name, object, event) {
	  object[name] = function(){ return event.fire() };
	  object['can_'+name] = function(){ return event.can_fire() };
	},
	get_state: function(){
	  console.log("getting state: "+this.state);
	  return this.state;
	},
	set_state: function(state){
	  console.log("setting state to: "+state);
	  this.state = state;
	}
};
