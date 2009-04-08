
SM.Machine = function(name, object, options) {
  this.states = new SM.StateCollection();
  this.events = new SM.EventCollection();
  
  this.state = options && options.initial ? options.initial : '';
  this.add_methods_to_object(object, name);
  return this;
}

SM.Machine.prototype = {
  
	add_methods_to_object: function(object, name){
	  object.state_machine    = this;
	  object[name]            = this.state;
	  object[name+'_events']  = this.events.all();
	  object.event            = this.event;
	},
	event: function(name, options) {
		// creates an event
		var event = this.state_machine.events.add(name, options);
	  this.state_machine.add_event_methods(name, this);
	  return event;
	},
	add_event_methods: function(name, obj) {
	  obj[name] = function(){};
	  obj['can_'+name] = function(){};
	}
};
