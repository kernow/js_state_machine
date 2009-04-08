
SM.Transition = function(){
  return this;
}

SM.Transition.prototype = {
	add: function(name, options) {
		// creates an event
		this.events.push({ name: name, options: options});
	},
  all: function() {
    return this.events;
  }
}
