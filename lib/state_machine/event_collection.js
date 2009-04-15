
SM.EventCollection = function(){
  this.events = [];
  return this;
}

SM.EventCollection.prototype = {
	add: function(name, machine, options) {
		var event = new SM.Event(name, machine, options)
		this.events.push(event);
		return event;
	},
  all: function() {
    return this.events;
  }
}
