
/* Private class */
SM.EventCollection = function(){
  this.events = [];
  return this;
};

SM.EventCollection.prototype = {
	add: function(name, machine) {
		var event = new SM.Event(name, machine);
		this.events.push(event);
		return event;
	},
  all: function() {
    return this.events;
  }
};
