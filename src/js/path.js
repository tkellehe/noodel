(function(global, Pipe, Command, Token){

function Path(code) {
  this.code = code;
  this.start = new Token(0, this.code, undefined);
  this.current = this.start;
  this.end = this.start.tokenize();
  this.onsteps = [];
  this.onends = [];
  this.onstops = [];
  
  var self = this;
  function invoke_onsteps() { for(var i = 0, l = self.length; i < l; ++i) self.onsteps[i]() };
  function invoke_onends() { for(var i = 0, l = self.length; i < l; ++i) self.onends[i]() };
  function invoke_onstops() { for(var i = 0, l = self.length; i < l; ++i) self.onstops[i]() };
  
  Object.defineProperty(self, "onstep", {
    get: function() { return invoke_onsteps },
    set: function(v) { self.onsteps.push(v) }
  });
  Object.defineProperty(self, "onend", {
    get: function() { return invoke_onends },
    set: function(v) { self.onends.push(v) }
  });
  Object.defineProperty(self, "onstop", {
    get: function() { return invoke_onstops },
    set: function(v) { self.onstops.push(v) }
  });
}

Path.prototype.step = function() {
  this.current.cmd.exec();
  this.current = this.current.next();
  this.onstep();
  return !!this.current;
}

Path.prototype.stop = function() {
  if(this.timeout) {
    clearTimeout(this.timeout);
    this.timeout = undefined;
    this.onstop();
    this.onend();
  }
}

Path.prototype.exec = function() {
  this.stop();
  var self = this;
  (function loop(){
    if(self.step()) {
      self.timeout = setTimeout(loop, 1);
    } else {
      self.timeout = undefined;
      self.onend();
    }
  })()
}

})(this, this.Pipe, this.Command, this.Token)
