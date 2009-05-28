
SM.Machine = function(name, object, options, block) {
  this.events     = new SM.EventCollection();
  this.states     = new SM.StateCollection();
  this.callbacks  = new SM.CallbackCollection();
  
  this.object       = object;
  this.machine_name = name;
  
  this.internal_state = options && options.initial ? options.initial : '';
  this._add_methods_to_object(name, object);
  
  if(block){ block(this); }
  return this;
};

SM.Machine.prototype = {
  
  event: function(name, block) {
    var event = this.events.add(name, this);
    this._add_event_methods(name, this.object, event);
    if(block){ block(event); }
    return event;
	},
	before_transition: function(options, block){
    var callback = this.callbacks.add('before', options, this, block);
	},
	after_transition: function(options, block){
    var callback = this.callbacks.add('after', options, this, block);
	},
	state: function(){
    return this.internal_state;
  },
  /* Private method */
	_add_methods_to_object: function(name, object){
	  object[name]            = this.state();
	  object[name+'_events']  = this.events.all();
	  object[name+'_states']  = this.states.all();
	},
	_add_event_methods: function(name, object, event) {
	  object[name] = function(){ return event.fire(arguments); };
	  object['can_'+name] = function(){ return event.can_fire(); };
	},
	_set_state: function(state){
	  this.internal_state = state;
	  this.object[this.machine_name] = state;
	}
};
