(function(global, Pipe, Command, Token, Path, char_codes, CHAR, NUMBER, STRING, ARRAY){

function in_to_out(tkn, path) {
  tkn.outputs.pipe(tkn.inputs);
}
function out_to_in(tkn, path) {
  if(tkn.parent) tkn.inputs.pipe(tkn.parent.outputs);
}

/// NOPs
Command.commands[" "] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};
Command.commands["\t"] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};
Command.commands["\n"] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};
  
/// Literals
Command.commands[char_codes[239]] = function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function(tkn) {
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && CHAR.is_printable(tkn.code[i]); ++i)
      tkn.content += tkn.code[i];
    tkn.end = tkn.literal.length + tkn.start + tkn.content.length - 1;
    return old.call(this, tkn);
  };
  
  cmd.exec = function(tkn, path) {
    tkn.outputs.back(new STRING(tkn.content));
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[237]] = function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function(tkn) {
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && CHAR.is_printable(tkn.code[i]); ++i)
      tkn.content += tkn.code[i];
    tkn.end = tkn.literal.length + tkn.start + tkn.content.length - 1;
    return old.call(this, tkn);
  };
  
  cmd.exec = function(tkn, path) {
    var a = [];
    for(var i = 0; i < tkn.content.length; ++i)
      a.push(new CHAR(tkn.content[i]));
    tkn.outputs.back(new ARRAY(a));
  }
  
  cmd.exec = in_to_out;
};
  
/// Operands
Command.commands[char_codes[251]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var lhs = tkn.inputs.front();
    if(lhs) {
      var rhs = tkn.inputs.front();
      if(rhs) {
        tkn.outputs.back(lhs.add(rhs, tkn));
      } else tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[252]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var lhs = tkn.inputs.front();
    if(lhs) {
      var rhs = tkn.inputs.front();
      if(rhs) {
        tkn.outputs.back(lhs.sub(rhs, tkn));
      } else tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
};

Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };

})(this, this.Pipe, this.Command, this.Token, this.Path, this.char_codes, this.types.CHAR, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
