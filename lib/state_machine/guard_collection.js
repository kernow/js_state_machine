
SM.GuardsCollection = function() {
	  this.guards = [];
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
    for(var i=0;i<this.guards.length;i++){
      if( this.guards[i].match(name, from) ){
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
