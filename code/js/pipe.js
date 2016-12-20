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
}

Pipe.prototype.rpipe = function(other) {
  while(other.length()) this.front(other.back());
}

global.Pipe = Pipe;

})(this)
