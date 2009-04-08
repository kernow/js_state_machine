
SM.EventCollection = function(){
  this.events = [];
  return this;
}

SM.EventCollection.prototype = {
  // new: function(){
  //   this.events = [];
  //   return this;
  // },
	add: function(name, options) {
		// creates an event
		var event = new SM.Event(name, options)
		this.events.push(event);
		return event;
	},
  all: function() {
    return this.events;
  }
}
