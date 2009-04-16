
SM.Guard = function(name, object, options){
  this.name     = name;
  this.object   = object;
  this.from     = options.from;
  this.to       = options.to;
  this.options  = options;
  return this;
}

SM.Guard.prototype = {
  match: function(name, from){
    if(name == this.name && (from == this.from || this.from == 'any')){
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
  run_callbacks: function(){
    var success = true;
    if(this.options.if){
      success = this.object[this.options.if]();
    }
    if(this.options.unless && success){
      success = !this.object[this.options.unless]();
    }
    return success;
  }
}
