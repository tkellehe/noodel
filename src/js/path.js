(function(global, Pipe, Command, Token){

function Path(code) {
  this.code = code;
  this.start = new Token(0, this.code, undefined);
  this.start.path = this;
  this.current = this.start;
  this.end = this.start.tokenize();
  this.previous = this.end;
  this.onsteps = [];
  this.onstarts = [];
  this.onends = [];
  this.onstops = [];
  this.timeout = undefined;
  this.rate = 0;
  
  var self = this;
  function invoke_onsteps() { for(var i = 0, l = self.onsteps.length; i < l; ++i) self.onsteps[i].call(self) };
  function invoke_onstarts() { for(var i = 0, l = self.onstarts.length; i < l; ++i) self.onstarts[i].call(self) };
  function invoke_onends() { for(var i = 0, l = self.onends.length; i < l; ++i) self.onends[i].call(self) };
  function invoke_onstops() { for(var i = 0, l = self.onstops.length; i < l; ++i) self.onstops[i].call(self) };
  
  Object.defineProperty(self, "onstep", {
    get: function() { return invoke_onsteps },
    set: function(v) { self.onsteps.push(v) }
  });
  Object.defineProperty(self, "onstart", {
    get: function() { return invoke_onstarts },
    set: function(v) { self.onstarts.push(v) }
  });
  Object.defineProperty(self, "onend", {
    get: function() { return invoke_onends },
    set: function(v) { self.onends.push(v) }
  });
  Object.defineProperty(self, "onstop", {
    get: function() { return invoke_onstops },
    set: function(v) { self.onstops.push(v) }
  });
  
  this.inputs = new Pipe();
  this.outputs = new Pipe();
  
  this.onstart = function() { this.start.inputs.pipe(this.inputs) };
  this.onend = function() { this.outputs.pipe(this.previous.outputs) };
}

Path.prototype.step = function() {
  if(!this.current) return false;
  if(this.current === this.start) this.onstart();
  this.current.cmd.exec(this.current, this);
  this.previous = this.current;
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
      self.timeout = setTimeout(loop, self.rate);
    } else {
      self.timeout = undefined;
      self.onend();
    }
  })()
}

global.Path = Path;

})(this, this.Pipe, this.Command, this.Token)
