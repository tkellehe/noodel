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
      a.push(new STRING(tkn.content[i]));
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
Command.commands[char_codes[251]+char_codes[233]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var lhs = tkn.inputs.front();
    if(lhs) {
      var rhs = tkn.inputs.front();
      if(rhs) {
        tkn.outputs.back(lhs.add_flip(rhs, tkn));
      } else tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[252]+char_codes[233]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var lhs = tkn.inputs.front();
    if(lhs) {
      var rhs = tkn.inputs.front();
      if(rhs) {
        tkn.outputs.back(lhs.sub_flip(rhs, tkn));
      } else tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[233]+char_codes[251]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var rhs = tkn.inputs.front();
    if(rhs) {
      var lhs = tkn.inputs.front();
      if(lhs) {
        tkn.outputs.back(lhs.add(rhs, tkn));
      } else tkn.outputs.back(rhs);
    }
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[233]+char_codes[252]] = function(cmd) {
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
  
/// Array specific operators
Command.commands["_"] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.front();
    if(f && f.type === "ARRAY") {
      for(var i = 0; i < f.value.length; ++i) tkn.outputs.back(f.value[i]);
    } else tkn.inputs.front(f);
  }
  
  cmd.exec = in_to_out;
};
  
/// Operations directly to the Pipe
Command.commands[char_codes[200]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    tkn.inputs.wipe();
  }
  
  cmd.exec = in_to_out;
};
Command.commands[char_codes[202]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    tkn.inputs.front();
  }
  
  cmd.exec = in_to_out;
};

/// Operations for printing.
Command.commands[char_codes[106]] = function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.front();
    path.outputs.wipe();
    if(f) path.outputs.back(f);
  }
  
  cmd.exec = in_to_out;
};

/// Conditionals and loops.
Command.commands[char_codes[187]] = function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function(tkn) {
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && tkn.code[i] !== "\n"; ++i)
      tkn.content += tkn.code[i];
    if(tkn.code[i] === "\n") tkn.content += "\n";
    tkn.end = tkn.literal.length + tkn.start + tkn.content.length - 1;
    tkn.path = new Path(tkn.content);
    tkn.path.start.parent = tkn;
    tkn.branches.front(tkn.path.start);
    tkn.path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.path.start };
    
    return old.call(this, tkn);
  };
  
  cmd.exec = in_to_out;
};  
  
Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };

})(this, this.Pipe, this.Command, this.Token, this.Path, this.char_codes, this.types.CHAR, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
