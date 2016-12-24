(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };
noodel.commandify = function(cmd) {
  if(arguments.length > 1)
    cmd = Array.prototype.join.call(arguments, ")(");
  return new RegExp("^(" + cmd + ")$");
};

function in_to_out(path) {
  this.tkn.outputs.pipe(this.tkn.inputs);
}
function out_to_in(path) {
  if(this.tkn.parent) this.tkn.inputs.pipe(this.tkn.parent.outputs);
}

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(noodel.commandify("[ \t\n]"), function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(noodel.commandify(characters.correct("“"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.content = this.tkn.params[0];
    this.tkn.end = this.tkn.literal.length + this.tkn.start + this.tkn.content.length - 1;
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.content));
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each printable character following it.
Command.add(noodel.commandify(characters.correct("‘"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.content = this.tkn.params[0];
    this.tkn.end = this.tkn.literal.length + this.tkn.start + this.tkn.content.length - 1;
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.content.length; ++i)
      a.push(new STRING(this.tkn.content[i]));
    this.tkn.outputs.back(new ARRAY(a));
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁺")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁻")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
});
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁺")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var rhs = this.tkn.inputs.front();
    if(rhs) {
      var lhs = this.tkn.inputs.front();
      if(lhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(rhs);
    }
  }
  
  cmd.exec = in_to_out;
});
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁻")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
/// Array specific operators
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Flattens that particular data type (for arrays places into elements, strings turned into char arrays
/// and numbers into integers.
Command.add(noodel.commandify("_"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.value.length; ++i) this.tkn.outputs.back(f.value[i]);
      } else if(f.type === "NUMBER") {
        this.tkn.outputs.back(f.integerify());
      } else if(f.type === "STRING") {
        this.tkn.outputs.back(f.arrayify());
      }
    } else this.tkn.inputs.front(f);
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(noodel.commandify("ạ"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var index = undefined, saved;
      if(f.type === "NUMBER")
      {
        index = f.valueify();
        saved = f;
        f = this.tkn.inputs.front();
        if(!f) return;
      }
      
      if(f.type === "STRING" || f.type === "ARRAY") {
        if(f.frame === undefined) f.frame = index;
        if(f.frame === undefined) f.frame = 0;
        this.tkn.outputs.back(f.access(f.frame));
        f.frame = (f.frame + 1) % f.length();
        if(saved !== undefined) {
          this.tkn.outputs.back(saved);
        }
        this.tkn.outputs.back(f);
      }
    }
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Blocks the pipe preventing all items from moving on.
Command.add(noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.wipe();
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Removes the item in the front of the pipe.
Command.add(noodel.commandify(characters.correct("ḋ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.front();
  }
  
  cmd.exec = in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe to the back.
Command.add(noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) this.tkn.inputs.back(f);
  }
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("ç")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    path.outputs.wipe();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = in_to_out;
});
  

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and places what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("Ç")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    path.outputs.wipe();
    if(f) {
      path.outputs.back(f);
    }
  }
  
  cmd.exec = in_to_out;
});


//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("þ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      path.outputs.back(f);
    }
  }
  
  cmd.exec = in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
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
Command.add(noodel.commandify(characters.correct("ḷ")), function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    tkn.content = "";
    for(var i = tkn.end+1; i < tkn.code.length && tkn.code[i] !== "\n"; ++i)
      tkn.content += tkn.code[i];
    if(tkn.code[i] === "\n") tkn.content += "\n";
    tkn.end = tkn.literal.length + tkn.start + tkn.content.length - 1;
    tkn.sub_path = new Path(tkn.content);
    tkn.sub_path.start.parent = tkn;
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this, tkn);
  };
  
  cmd.exec = in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(noodel.commandify(characters.correct("ḍ"), "\\d+"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
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
Command.add(new RegExp("^("+characters.correct("ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
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
Command.add(new RegExp("^("+characters.correct("ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = out_to_in;
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
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

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
