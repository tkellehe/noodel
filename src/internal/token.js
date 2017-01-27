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
Command.add = function(li, r, f) {
  Command.commands.push({literal_index: li+1, regex:r, f:f});
};
function CommandLookUp(res, index) {
  this.index = index;
  this.literal = res[Command.commands[index].literal_index];
  this.params = [];
  for(var i = 1; i < res.length; ++i) if(i !== Command.commands[index].literal_index) this.params.push(res[i]);
  this.captured = res[0];
};
Command.find = function(text) {
  for(var i = Command.commands.length; i--;) {
    var res = Command.commands[i].regex.exec(text);
    if(res) {
      var p = new CommandLookUp(res, i);
      return p;
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
  var i = tkn.start, string = tkn.code[i], look = undefined;
  //while(tkn.code[i] !== "\n" && i < tkn.code.length) {
  // Parses entire script to find the best command.
  while(i < tkn.code.length) {
    var get = Command.find(string);
    // If found a command that uses more characters then use that.
    if(get !== undefined) {
      look = get;
    }
    string += tkn.code[++i];
  }
  
  if(look) {
    tkn.literal = look.literal;
    tkn.end = tkn.start + look.captured.length - 1;
    tkn.cmd = new Command(tkn, Command.commands[look.index].f);
    tkn.params = look.params;
    tkn.captured = look.captured;
  }
}

global.Token = Token;

})(this, this.Pipe)
