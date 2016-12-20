(function(global){

function Pipe() {
  var self = this;
  self.__array__ = [];
  self.front = function(v) {
    if(arguments.length === 0) return self.front.pop();
    self.front.push(v);
    return self;
  }
  self.front.push = function(v) {
    self.__array__.unshift(v);
    return self;
  }
  self.front.pop = function() {
    return self.__array__.shift();
  }
  
  self.back = function(v) {
    if(arguments.length === 0) return self.back.pop();
    self.back.push(v);
    return self;
  }
  self.back.push = function(v) {
    self.__array__.push(v);
    return self;
  }
  self.back.pop = function() {
    return self.__array__.pop();
  }
}

Pipe.prototype.length = function() {
  return this.__array__.length;
}

Pipe.prototype.first = function() {
  return this.__array__[0];
}

Pipe.prototype.last = function() {
  return this.__array__[this.length() - 1];
}

Pipe.prototype.pipe = function(other) {
  while(other.length()) this.back(other.front());
  return this;
}

Pipe.prototype.rpipe = function(other) {
  while(other.length()) this.front(other.back());
  return this;
}

Pipe.prototype.at = function(i, v) {
  if(arguments.length === 1) {
    return this.__array__[i];
  } else if(arguments.length === 2 && 0 <= i && i < this.length()) {
    this.__array__[i] = v;
    return this;
  }
}

Pipe.prototype.each = function(f) {
  var r = undefined;
  for(var i = 0, l = this.length(); i < l && (r === undefined || (typeof r === "boolean" && r)); ++i)
    r = f.call(this, this.at(i));
  return this;
}

Pipe.prototype.reverse = function() {
  for(var i = 0, l = this.length(); i < l; ++i)
    this.front(this.back());
  return this;
}

global.Pipe = Pipe;

})(this)
