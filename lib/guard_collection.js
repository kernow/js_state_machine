
SM.GuardsCollection = function() {
	  this.guards = [];
	  return this;
}

SM.GuardsCollection.prototype = {
	add: function(name, options) {
    var guard = new SM.Guard(name, options)
		this.guards.push(guard);
		return guard;
	},
  all: function() {
    return this.guards;
  },
  match: function(name, from){
    for(var i=0;i<this.guards.length;i++){
      if( this.guards[i].match(name, from) ){
        return true;
      }
	  }
	  return false;
  },
  find_to_state: function(name, from){
    return 'idling'; 
  }
}
