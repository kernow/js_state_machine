
/* Private class */
SM.Guard = function(name, object, options){
  this.name     = name;
  this.object   = object;
  this.from     = options.from;
  this.to       = options.to;
  this.except   = options.except;
  this.options  = options;
  return this;
};

SM.Guard.prototype = {
  match: function(name, from, params){
    if(name == this.name && this.match_from_state(from)){
      if(this.run_callbacks(params)){
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
      if(this.from == 'any'){
        return this.check_exceptions(from);
      }
      else{
        return from == this.from;
      }
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
  check_exceptions: function(from){
    return from != this.except;
  },
  run_callbacks: function(params){
    var success = true;
    if(this.options.when){
      success = this.options.when.apply(this.object, params);
    }
    if(this.options.unless && success){
      success = !this.options.unless.apply(this.object, params);
    }
    return success;
  }
};
