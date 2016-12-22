(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

function in_to_out(tkn, path) {
  tkn.outputs.pipe(tkn.inputs);
}
function out_to_in(tkn, path) {
  if(tkn.parent) tkn.inputs.pipe(tkn.parent.outputs);
}

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(/^( )$/, function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
});
Command.add(/^(\t)$/, function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
});
Command.add(/^(\n)$/, function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(new RegExp("^("+characters.chars[239]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function(tkn) {
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && characters.printables.is(tkn.code[i]); ++i)
      tkn.content += tkn.code[i];
    tkn.end = tkn.literal.length + tkn.start + tkn.content.length - 1;
    return old.call(this, tkn);
  };
  
  cmd.exec = function(tkn, path) {
    tkn.outputs.back(new STRING(tkn.content));
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each printable character following it.
Command.add(new RegExp("^("+characters.chars[237]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function(tkn) {
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && characters.printables.is(tkn.code[i]); ++i)
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
});

//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(new RegExp("^("+characters.chars[251]+")$"), function(cmd) {
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
});
Command.add(new RegExp("^("+characters.chars[252]+")$"), function(cmd) {
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
});
Command.add(new RegExp("^("+characters.chars[251]+characters.chars[136]+")$"), function(cmd) {
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
});
Command.add(new RegExp("^("+characters.chars[252]+characters.chars[136]+")$"), function(cmd) {
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
});
Command.add(new RegExp("^("+characters.chars[136]+characters.chars[251]+")$"), function(cmd) {
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
});
Command.add(new RegExp("^("+characters.chars[136]+characters.chars[252]+")$"), function(cmd) {
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
});
  
/// Array specific operators
Command.add(/^(_)$/, function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.value.length; ++i) tkn.outputs.back(f.value[i]);
      } else if(f.type === "NUMBER") {
        tkn.outputs.back(f.integerify());
      } else if(f.type === "STRING") {
        tkn.outputs.back(f.arrayify());
      }
    } else tkn.inputs.front(f);
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Blocks the pipe preventing all items from moving on.
Command.add(new RegExp("^("+characters.chars[200]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    tkn.inputs.wipe();
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Removes the item in the front of the pipe.
Command.add(new RegExp("^("+characters.chars[202]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    tkn.inputs.front();
  }
  
  cmd.exec = in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe to the back.
Command.add(new RegExp("^("+characters.chars[203]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.front();
    if(f) tkn.inputs.back(f);
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(new RegExp("^("+characters.chars[106]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.first();
    path.outputs.wipe();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output.
Command.add(new RegExp("^("+characters.chars[134]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    var f = tkn.inputs.first();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Conditionals and loops.
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Contiously loops the code following it up to a new line.
Command.add(new RegExp("^("+characters.chars[187]+")$"), function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = function(tkn, path) {
    tkn.inputs.pipe(tkn.path.end.outputs);
  }
  
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
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(new RegExp("^("+characters.chars[182]+")(\\d+)$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = +tkn.params[0];
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using fractions
Command.add(new RegExp("^("+characters.chars[182]+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      var num = 1000, den = 1;
      if(tkn.params[0].length) {
        num *= +tkn.params[0];
      }
      if(tkn.params[1].length) {
        den = +tkn.params[1];
      }
      path.rate = Math.floor(num / den);
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using decimals
Command.add(new RegExp("^("+characters.chars[182]+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(tkn, path) {
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      var num = (+("0"+tkn.params[0]+"."+tkn.params[1]+"0")) * 1000;
      path.rate = Math.floor(num);
    } else {
      tkn.ran = false;
      tkn.next = tkn.old_next;
      path.rate = tkn.old_rate;
    }
  }
  
  cmd.exec = in_to_out;
});
  
Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
