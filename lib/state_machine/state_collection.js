
SM.StateCollection = function() {
	  this.states = [];
	  return this;
};

SM.StateCollection.prototype = {
	add: function(name) {
		if(typeof name == 'string'){
  		var state = new SM.State(name);
  		this.states.push(state);
		}
		else{
		  for(var i=0;i<name.length;i++){
		    this.add(name[i]);
		  }
		}
	},
  all: function() {
    return this.states;
  }
};
