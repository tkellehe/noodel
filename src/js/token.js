(function(global, Pipe){

function Command(f) {
  if(f) f(this);

  this.methods = [];
  var self = this;
  function invoke() {
    for(var i = 0, l = self.methods.length; i < l; ++i)
      self.methods[i].apply(self, Array.prototype.slice.call(arguments))
  }
  Object.defineProperty(self, "exec", {
    get: function() { return invoke },
    set: function(v) { self.methods.push(v) }
  });
};

Command.commands = {};

Command.prototype.tokenize = function(tkn) {
  tkn.branches.front(new Token(tkn.end+1, tkn.code, tkn));
  return tkn.branches.first();
}

global.Command = Command;

///////////////////////////////////////////////////////////////////////////////

function Token(start, code, parent) {
  this.start = start;
  this.code = code;
  this.parent = parent;
  this.branches = new Pipe();
  this.inputs = new Pipe();
  this.outputs = new Pipe();
}

Token.prototype.tokenize = function() {
  var ecl = Token.parse(this);
  this.end = ecl.end;
  this.cmd = ecl.cmd;
  this.literal = ecl.cmd;
  var spawned = this.cmd.tokenize(this);
  if(spawned.literal === undefined) {
    this.branches.remove(spawned);
    return this;
  } else {
    return spawned.tokenize();
  }
}

Token.prototype.next = function() {
  return this.branches.first();
}

Token.parse = function(tkn) {
  var result = {end:tkn.start,cmd:new Command(),literal:tkn.code[tkn.start]};
  
  var i = tkn.start, string = tkn.code[i], literal = undefined;
  while(tkn.code[i] !== "\n" && i < tkn.code.length) {
    if(Command.commands[string] !== undefined) {
      literal = string;
    }
    string += tkn.code[++i];
  }
  
  if(literal) {
    result.literal = literal;
    result.end = tkn.start + literal.length - 1;
    result.cmd = new Command(Command.commands[literal]);
  }
  
  return result;
}

global.Token = Token;

})(this, this.Pipe)
