(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Loops.
//------------------------------------------------------------------------------------------------------------

Command.is_loop = function(literal) {
  return literal === characters.correct("ḷ") ||
         literal === characters.correct("Ḷ") ||
         literal === characters.correct("ṃ") ||
         literal === characters.correct("Ṃ") ||
         literal === characters.correct("ṇ") ||
         literal === characters.correct("Ṇ") ||
         literal === characters.correct("ọ") ||
         literal === characters.correct("Ọ") ||
         literal === characters.correct("ḟ") ||
         literal === characters.correct("Ḟ");
}
  
Command.is_break = function(literal) {
  return literal === characters.correct("ḅ") ||
         literal === characters.correct("Ḅ")
}
  
Command.is_loop_end = function(literal) {
  return literal === characters.correct("ḅ") ||
         literal === characters.correct("Ḅ") ||
         literal === characters.correct("€")
}
  
Command.collect_loop = function(start, code) {
  var s = "", count = 0;
  for(var i = start; i < code.length; ++i) {
    s += code[i];
    if(Command.is_loop(code[i])) count++;
    else if(Command.is_loop_end(code[i])) {
      if(count === 0) {
        return s;
      } else {
        count--;
      }
    }
  }
  return s;
}

//------------------------------------------------------------------------------------------------------------
/// NOP used to end loops.
Command.add(0, noodel.commandify(characters.correct("€")), function(cmd) {  
  cmd.exec = function(path) {}
});

//------------------------------------------------------------------------------------------------------------
/// Contiously loops the code following it up to a new line.
Command.add(0, new RegExp("^(" + characters.correct("ḷ") + ")$"), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    if(this.tkn.loop_count === undefined) {
      this.tkn.loop_count = 0;
      if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
    } else this.tkn.loop_count++;
  }
});

//------------------------------------------------------------------------------------------------------------
/// Loops the given code up to a new line based off of the integerified value in the pipe which is removed.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = path.top();
      if(f) {
        if(f.type === "ARRAY") {
          tkn.count = f.length();
          path.top(f);
        } else {
          f = f.integerify();
          tkn.count = f.value;
        }
      } else tkn.count = 0;
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    } else {
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops the given code up to a end loop token and selects specific item from the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("Ḷ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = path.top_ith(this.tkn.params[0]);
      if(f) {
        if(f.type === "ARRAY") {
          tkn.count = f.length();
          path.top(f);
        } else {
          f = f.integerify();
          tkn.count = f.value;
        }
      } else tkn.count = 0;
    }
    if(tkn.count-- < 1)
    {
      tkn.count = undefined;
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    } else {
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    tkn.params[1] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[1].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[1], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops the given code up to a new line based off of the number placed next to it.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")(\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
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
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    } else {
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[1] = Command.collect_loop(tkn.start + 1 + tkn.params[0].length, tkn.code);
    tkn.end = tkn.params[1].length + tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[1], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    tkn.params[0] = +tkn.params[0];
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as there is something in the front of the pipe that is truthy.
Command.add(0, noodel.commandify(characters.correct("ṃ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as there is something in the front of the pipe that is truthy and always removes.
Command.add(0, noodel.commandify(characters.correct("Ṃ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.top();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as the item on the top is truthy, if is falsey it will consume otherwise it will leave it.
Command.add(0, noodel.commandify(characters.correct("ṇ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      path.top();
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Loops as long as the item on the top is truthy, if is truthy it will consume otherwise it will leave it.
Command.add(0, noodel.commandify(characters.correct("Ṇ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(f && f.is_truthy().value) {
      path.top();
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) {
        this.tkn.loop_count = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Pushes a truthy if did not loop at all, and a falsy if did loop (evals without consuming).
Command.add(0, noodel.commandify(characters.correct("ọ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.first();
    if(!this.tkn.sub_path.end.loop_ran_or_not) {
      this.tkn.ran_or_not = new NUMBER(1);
    }
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) { 
        this.tkn.loop_count = 0;
        this.tkn.ran_or_not.value = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      path.top(this.tkn.ran_or_not);
      this.tkn.ran_or_not = undefined
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Pushes a truthy if did not loop at all, and a falsy if did loop (evals with consuming).
Command.add(0, noodel.commandify(characters.correct("Ọ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.top();
    if(!this.tkn.ran_or_not) {
      this.tkn.ran_or_not = new NUMBER(1);
    }
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) { 
        this.tkn.loop_count = 0;
        this.tkn.ran_or_not.value = 0;
        if(path.first() && path.first().type === "ARRAY") this.tkn.loop_array = path.first();
      } else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      path.top(this.tkn.ran_or_not);
      this.tkn.ran_or_not = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});
 
//------------------------------------------------------------------------------------------------------------
/// Loops the given code as a foreach loop.
Command.add(0, noodel.commandify(characters.correct("ḟ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    // If first time coming to the loop, set everything up.
    if(this.tkn.loop_count === undefined) {
      var f = path.first();
      tkn.next = function() { return tkn.sub_path.start }
      this.tkn.loop_count = 0;
      // Get the loop_array.
      if(f.type === "ARRAY") this.tkn.loop_array = f;
      else if(f.type === "STRING") {
        path.top(path.top().arrayify());
        this.tkn.loop_array = path.first();
      } else if(f.type === "NUMBER") {
        var a = [];
        f = path.top();
        for(var i = 0; i < f.value && path.first(); ++i) {
          a.push(path.top());
        }
        path.top(new ARRAY(a));
        this.tkn.loop_array = path.first();
      }
    // As long as the loop_count is less then the array length, keep looping.
    } else if(this.tkn.loop_count < this.tkn.loop_array.value.length-1) {
      ++this.tkn.loop_count;
    // Else we have reached the end of the array.
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});
 
//------------------------------------------------------------------------------------------------------------
/// Loops the given code as a foreach loop.
Command.add(0, noodel.commandify(characters.correct("Ḟ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    // If first time coming to the loop, set everything up.
    if(this.tkn.loop_count === undefined) {
      var f = path.top();
      tkn.next = function() { return tkn.sub_path.start }
      this.tkn.loop_count = 0;
      // Get the loop_array.
      if(f.type === "ARRAY") this.tkn.loop_array = f;
      else if(f.type === "STRING") {
        this.tkn.loop_array = f.arrayify();
      } else if(f.type === "NUMBER") {
        var a = [];
        for(var i = 0; i < f.value && path.first(); ++i) {
          a.push(path.top());
        }
        this.tkn.loop_array = new ARRAY(a);
      }
    // As long as the loop_count is less then the array length, keep looping.
    } else if(this.tkn.loop_count < this.tkn.loop_array.value.length-1) {
      ++this.tkn.loop_count;
    // Else we have reached the end of the array.
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
      this.tkn.loop_array = undefined;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[0] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[0].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[0], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
/// Breaks out of a looping command.
Command.add(0, noodel.commandify(characters.correct("ḅ")), function(cmd) {
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
      tkn.looper.loop_count = undefined;
      tkn.looper.loop_array = undefined;
      return next === tkn.looper.sub_path.start ? undefined : next
    };
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    path.top(this.tkn.looper.ran_or_not);
    this.tkn.looper.ran_or_not = undefined;
  };
});

//------------------------------------------------------------------------------------------------------------
/// Breaks out of a looping command depending on if the first item in the pipe is falsy which is removed.
Command.add(0, noodel.commandify(characters.correct("Ḅ")), function(cmd) {
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
    this.tkn.next = this.tkn.old_next;
    
    var f = path.top();
    if(f && f.is_truthy().value) {
      path.top(f);
    } else {
      this.tkn.old_next = this.tkn.next;
      var tkn = this.tkn;
      tkn.next = function() {
        var next = tkn.looper.branches.first();
        tkn.looper.loop_count = undefined;
        tkn.looper.loop_array = undefined;
        return next === tkn.looper.sub_path.start ? undefined : next
      };
      
      path.top(this.tkn.looper.ran_or_not);
      this.tkn.looper.ran_or_not = undefined;
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pushes the current loop count onto the stack.
Command.add(0, noodel.commandify(characters.correct("ɱ")), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var p = this.tkn.parent;
    while(!Command.is_loop(p.literal)) {
      p = p.parent;
    }
    
    this.tkn.looper = p;
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    path.top(new NUMBER(this.tkn.looper.loop_count));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pushes the current loop element onto the stack.
Command.add(0, noodel.commandify(characters.correct("ƙ")), function(cmd) {
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var p = this.tkn.parent;
    while(!Command.is_loop(p.literal)) {
      p = p.parent;
    }
    
    this.tkn.looper = p;
    
    return old.call(this);
  };
  
  cmd.exec = function(path) {
    if(this.tkn.looper.loop_array) path.top(this.tkn.looper.loop_array.access(this.tkn.looper.loop_count).copy());
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
