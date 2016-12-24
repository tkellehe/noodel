(function(global, Pipe){

function Command(tkn, f) {
  this.tkn = tkn;
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
  
Command.prototype.tokenize = function() {
  this.tkn.branches.front(new Token(this.tkn.end+1, this.tkn.code, this.tkn));
  return this.tkn.branches.first();
};

global.Command = Command;

///////////////////////////////////////////////////////////////////////////////

function Token(start, code, parent) {
  this.start = start;
  this.code = code;
  this.parent = parent;
  if(parent) this.path = parent.path;
  this.branches = new Pipe();
  this.inputs = new Pipe();
  this.outputs = new Pipe();
};

Token.prototype.tokenize = function() {
  Token.parse(this);
  if(this.cmd) {
    var spawned = this.cmd.tokenize();
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
    tkn.literal = literal;
    tkn.end = tkn.start + literal.length - 1;
    tkn.cmd = new Command(tkn, Command.commands[index].f);
    tkn.params = params;
  }
}

global.Token = Token;

})(this, this.Pipe)
