
SM.Event = function(name, options) {
  console.log("******* creating a new event *********");
  this.name = name;
  this.options = options;
  return this;
}
	
SM.Event.prototype = {
	transition: function(){
	  console.log("******* creating a new transition *********");
	  return this;
	}
}
