(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

noodel.in_to_out = function(path) {
  this.tkn.outputs.pipe(this.tkn.inputs);
};
noodel.out_to_in = function(path) {
  if(this.tkn.parent) this.tkn.inputs.pipe(this.tkn.parent.outputs);
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(noodel.commandify("[ \t\n]"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(noodel.commandify(characters.correct("“"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.params[0]));
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each printable character following it.
Command.add(noodel.commandify(characters.correct("‘"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i)
      a.push(new STRING(this.tkn.params[0][i]));
    this.tkn.outputs.back(new ARRAY(a));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(new RegExp("^((?:\\d*\\.\\d+)|(?:\\d+))$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new NUMBER(+this.tkn.literal));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number based off of a fraction and places it into the pipe.
Command.add(new RegExp("^(\\d*\/\\d+)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = this.tkn.literal.split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      num = +a[0];
    }
    this.tkn.outputs.back(new NUMBER(num/den));
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁺")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
Command.add(noodel.commandify(characters.correct("⁻")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var rhs = this.tkn.inputs.front();
    if(rhs) {
      var lhs = this.tkn.inputs.front();
      if(lhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(rhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁻")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
/// Array specific operators
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Flattens that particular data type (for arrays places into elements, strings turned into char arrays
/// and numbers into integers.
Command.add(noodel.commandify("_"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Takes the first element of strings/arrays and places it into the back. For numbers, it reciprocals.
Command.add(noodel.commandify("ẹ"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.shift();
        if(e) f.value.push(e);
        this.tkn.outputs.back(f);
      } else if(f.type === "NUMBER") {
        this.tkn.outputs.back(new NUMBER(1/f.valueify()));
      } else if(f.type === "STRING") {
        var s = f.valueify();
        this.tkn.outputs.back(new STRING(s.slice(1, s.length) + s.slice(0, 1)));
      }
    } else this.tkn.inputs.front(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(noodel.commandify("ạ"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Blocks the pipe preventing all items from moving on.
Command.add(noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.wipe();
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Removes the item in the front of the pipe.
Command.add(noodel.commandify(characters.correct("ḋ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.front();
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe to the back.
Command.add(noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) this.tkn.inputs.back(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("ç")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    path.outputs.wipe();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and places what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("Ç")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    path.outputs.wipe();
    if(f) {
      path.outputs.back(f);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});


//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("þ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      path.outputs.back(f);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  

//------------------------------------------------------------------------------------------------------------
/// Conditionals and loops.
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Contiously loops the code following it up to a new line.
Command.add(noodel.commandify(characters.correct("ḷ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
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
    tkn.sub_path = new Path(tkn.content, tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Loops the given code up to a new line based off of the integerified value in the pipe which is removed.
Command.add(noodel.commandify(characters.correct("Ḷ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = tkn.inputs.front();
      if(f) {
        f = f.integerify();
        tkn.count = f.valueify();
      } else tkn.count = 0;
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
    }
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
    tkn.sub_path = new Path(tkn.content, tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Breaks out of a looping command.
Command.add(noodel.commandify(characters.correct("ḅ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn, p = tkn.parent;
    while(p.literal !== characters.correct("ḷ") &&
          p.literal !== characters.correct("Ḷ")) {
      p = p.parent;
    }
    
    tkn.looper = p;
    
    tkn.next = function() {
      var next = tkn.looper.branches.first();
      return next === tkn.looper.sub_path.start ? undefined : next
    };
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
  
  cmd.exec = function(path) {
    if(this.tkn.next()) this.tkn.looper.outputs.pipe(this.tkn.outputs);
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(noodel.commandify(characters.correct("ḍ"), "\\d+"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using fractions
Command.add(new RegExp("^("+characters.correct("ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps using decimals
Command.add(new RegExp("^("+characters.correct("ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Type operations.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(noodel.commandify("'"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      this.tkn.outputs.back(f.stringify());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Numberifies the first item in the pipe.
Command.add(noodel.commandify("#"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      this.tkn.outputs.back(f.numberify());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)