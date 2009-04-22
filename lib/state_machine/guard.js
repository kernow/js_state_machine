
SM.Guard = function(name, object, options){
  this.name     = name;
  this.object   = object;
  this.from     = options.from;
  this.to       = options.to;
  this.options  = options;
  return this;
};

SM.Guard.prototype = {
  match: function(name, from){
    if(name == this.name && (this.match_from_state(from) || this.from == 'any')){
      if(this.run_callbacks()){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  },
  match_from_state: function(from){
    if(typeof this.from == 'string'){
      return from == this.from
    }
    else{
      for(var i=0;i<this.from.length;i++){
        if(from == this.from[i]){
          return true;
        }
      }
      return false;
    }
  },
  run_callbacks: function(){
    var success = true;
    if(this.options.when){
      success = this.object[this.options.when]();
    }
    if(this.options.unless && success){
      success = !this.object[this.options.unless]();
    }
    return success;
  }
};
