(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Loops.
//------------------------------------------------------------------------------------------------------------

Command.is_loop = function(literal) {
  return literal === characters.correct("ḷ") ||
         literal === characters.correct("Ḷ") ||
         literal === characters.correct("ṃ") ||
         literal === characters.correct("Ṃ");
}
  
//------------------------------------------------------------------------------------------------------------
// Contiously loops the code following it up to a new line.
Command.add(0, new RegExp("^(" + characters.correct("ḷ") + ")([^\\n]*)" + "$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Loops the given code up to a new line based off of the integerified value in the pipe which is removed.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")([^\\n]*)" + "$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = tkn.inputs.front();
      if(f) {
        f = f.integerify();
        tkn.count = f.value;
      } else tkn.count = 0;
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Loops the given code up to a new line based off of the number placed next to it.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")(\\d+)([^\\n]*)" + "$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      tkn.count = tkn.params[0];
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    tkn.sub_path = new Path(tkn.params[1], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    tkn.params[0] = +tkn.params[0];
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Loops as long as there is something in the front of the pipe that is truthy and removes if falsy.
Command.add(0, noodel.commandify(characters.correct("ṃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
    var tkn = this.tkn, f = tkn.inputs.front();
    if(f && f.is_truthy().valueify()) {
      tkn.inputs.front(f);
      tkn.next = function() { return tkn.sub_path.start }
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
    }
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
// Loops as long as there is something in the front of the pipe that is truthy and always removes.
Command.add(0, noodel.commandify(characters.correct("Ṃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = function(path) {
    this.tkn.inputs.pipe(this.tkn.sub_path.end.outputs);
    var tkn = this.tkn, f = tkn.inputs.front();
    if(f && f.is_truthy().valueify()) {
      tkn.next = function() { return tkn.sub_path.start }
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
    }
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
Command.add(0, noodel.commandify(characters.correct("ḅ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn, p = tkn.parent;
    while(!Command.is_loop(p.literal) && !p.has_break) {
      p = p.parent;
    }
    
    tkn.looper = p;
    p.has_break = tkn;
    
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
/// Breaks out of a looping command depending on if the first item in the pipe is falsy which is removed.
Command.add(0, noodel.commandify(characters.correct("Ḅ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn, p = tkn.parent;
    while(!Command.is_loop(p.literal) && !p.has_break) {
      p = p.parent;
    }
    
    tkn.looper = p;
    p.has_break = tkn;
    this.tkn.old_next = this.tkn.next;
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    // Must reset everything.
    this.tkn.didBreak = false;
    this.tkn.next = this.tkn.old_next;
    
    var f = this.tkn.inputs.front();
    if(f && f.is_truthy().value) {
      this.tkn.inputs.front(f);
    } else {
      this.didBreak = true;
      this.tkn.old_next = this.tkn.next;
      var tkn = this.tkn;
      tkn.next = function() {
        var next = tkn.looper.branches.first();
        return next === tkn.looper.sub_path.start ? undefined : next
      };
    }
  }
  
  cmd.exec = noodel.in_to_out;
  
  cmd.exec = function(path) {
    if(this.tkn.didBreak && this.tkn.next()) {
      this.tkn.looper.outputs.pipe(this.tkn.outputs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps based off of what is in the pipe.
Command.add(0, noodel.commandify(characters.correct("ḍ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
    tkn.inputs.pipe(tkn.outputs);
    var f = tkn.inputs.first();
    if(f) {
      if(!tkn.ran) {
        tkn.old_next = tkn.next;
        tkn.next = function() { return tkn };
        tkn.ran = true;
        tkn.old_rate = path.rate;
        path.rate = f.integerify().value;
      } else {
        tkn.ran = false;
        tkn.next = tkn.old_next;
        path.rate = tkn.old_rate;
        tkn.inputs.front();
      }
    } else {
      noodel.make_error(new STRING("¤Expected¤something¤in¤the¤pipe."), path);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "\\d+"), function(cmd) {
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
// Delay for number of steps.
Command.add(0, noodel.commandify(characters.correct("ḍ"), "[shqe]"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  var map = { s: 1000, h: 500, q: 250, e: 125 };
  function get_rate(c) {
    return map[c];
  };
  
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(!tkn.ran) {
      tkn.old_next = tkn.next;
      tkn.next = function() { return tkn };
      tkn.ran = true;
      tkn.old_rate = path.rate;
      path.rate = get_rate(tkn.params[0]);
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
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)/(\\d*)$"), function(cmd) {
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
Command.add(0, new RegExp("^("+characters.correct("ḍ")+")(\\d*)\\.(\\d*)$"), function(cmd) {
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

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
