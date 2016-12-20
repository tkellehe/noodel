(function(global, Pipe){

function Command(f) {
  if(typeof f === "string") {
    // Command is made up of code itself.
    this.tokenize = function(tkn) {
      
    }
  } else if(f === undefined) {
    this.tokenize = function(tkn) {}
  } else {
    this.tokenize = f;
  }

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
  
  this.exec = function(tkn) {
    if(tkn.parent)
      tkn.inputs.pipe(tkn.parent.outputs);
  }
}

Command.commands = {};

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
  this.cmd.tokenize(this);
  return (this.end === this.code.length - 1) ? this : (new Token(this.end+1,this.code,this)).tokenize();
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
