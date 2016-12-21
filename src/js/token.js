(function(global, Pipe){

function Command(f) {
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
  
  if(f) f(this);
};

Command.commands = [];
Command.add = function(r, f) {
  Command.commands.push({regex:r, f:f});
};
Command.find = function(text) {
  for(var i = Command.commands.length; i--;) {
    var res = Command.commands[i].regex.exec(text);
    if(res) {
      var p = [];
      for(var j = 2; j < res.length; ++j) p.push(res[j]);
      return { literal: res[1], params: p, index:i };
    }
  }
};
  
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
  this.literal = ecl.literal;
  this.params = ecl.params;
  if(this.cmd) {
    var spawned = this.cmd.tokenize(this);
    return spawned.tokenize();
  } else if(this.parent) {
    this.parent.branches.remove(this);
    return this.parent;
  }
}

Token.prototype.next = function() {
  return this.branches.first();
}

Token.parse = function(tkn) {
  var result = {end:-1,cmd:undefined,literal:undefined,params:undefined};
  
  var i = tkn.start, string = tkn.code[i], literal = undefined, params = undefined, index = undefined;
  while(tkn.code[i] !== "\n" && i < tkn.code.length) {
    var get = Command.find(string);
    if(get !== undefined) {
      literal = get.literal;
      params = get.params;
      index = get.index;
    }
    string += tkn.code[++i];
  }
  
  if(literal) {
    result.literal = literal;
    result.end = tkn.start + literal.length - 1;
    result.cmd = new Command(Command.commands[index].f);
    result.params = params;
  }
  
  return result;
}

global.Token = Token;

})(this, this.Pipe)
