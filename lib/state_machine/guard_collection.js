
SM.GuardsCollection = function() {
	  this.guards = [];
	  this.last_match = null;
	  return this;
};

SM.GuardsCollection.prototype = {
	add: function(name, object, options) {
    var guard = new SM.Guard(name, object, options);
		this.guards.push(guard);
		return guard;
	},
  all: function() {
    return this.guards;
  },
  match: function(name, from){
    // console.log("gurads length: "+this.guards.length);
    // console.log("name: "+name+", from: "+from);
    for(var i=0;i<this.guards.length;i++){
      var match = this.guards[i].match(name, from);
      if(match){
        this.last_match = match;
        return this.guards[i];
      }
	  }
	  return false;
  },
  find_to_state: function(name, from){
    var match = this.match(name, from);
    if(match){
      return match.to;
    }
  }
};
