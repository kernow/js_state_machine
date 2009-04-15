
SM.Guard = function(name, options){
  this.name = name;
  this.from = options.from;
  this.to   = options.to;
  return this;
}

SM.Guard.prototype = {
  match: function(name, from){
    if(name == this.name && from == this.from){
      return true;
    }
    else{
      return false;
    }
  }
}
