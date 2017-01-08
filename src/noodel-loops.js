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
  
Command.is_break = function(literal) {
  return literal === characters.correct("ḅ") ||
         literal === characters.correct("Ḅ")
}
  
Command.collect_loop = function(start, code) {
  var s = "", count = 0;
  for(var i = start; i < code.length && code[i] !== "\n"; ++i) {
    s += code[i];
    if(Command.is_loop(code[i])) count++;
    else if(Command.is_break(code[i]) || (code[i] === characters.correct("€"))) {
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
// Contiously loops the code following it up to a new line.
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
    if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
    else this.tkn.loop_count++;
  }
});

//------------------------------------------------------------------------------------------------------------
// Loops the given code up to a new line based off of the integerified value in the pipe which is removed.
Command.add(0, new RegExp("^(" + characters.correct("Ḷ") + ")$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn;
    if(tkn.count === undefined) {
      tkn.next = function() { return tkn.sub_path.start };
      var f = path.top();
      if(f) {
        if(f.type === "ARRAY" || f.type === "STRING") {
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
    } else {
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
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
// Loops the given code up to a new line based off of the number placed next to it.
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
    } else {
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    
    tkn.params[1] = Command.collect_loop(tkn.start+1, tkn.code);
    tkn.end = tkn.params[1].length + tkn.start + tkn.literal.length - 1;
    
    tkn.sub_path = new Path(tkn.params[1], tkn);
    tkn.branches.front(tkn.sub_path.start);
    tkn.sub_path.end.branches.front(tkn);
    
    tkn.next = function() { return tkn.sub_path.start };
    
    tkn.params[0] = +tkn.params[0];
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
// Loops as long as there is something in the front of the pipe that is truthy and removes if falsy.
Command.add(0, new RegExp("^(" + characters.correct("ṃ") + ")([^\\n]*)" + "$"), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.top();
    if(f && f.is_truthy().value) {
      path.top(f);
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
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
// Loops as long as there is something in the front of the pipe that is truthy and always removes.
Command.add(0, noodel.commandify(characters.correct("Ṃ")), function(cmd) {
  cmd.exec = function(path) {
    var tkn = this.tkn, f = path.top();
    if(f && f.is_truthy().value) {
      tkn.next = function() { return tkn.sub_path.start }
      if(this.tkn.loop_count === undefined) this.tkn.loop_count = 0;
      else this.tkn.loop_count++;
    } else {
      // Have to make sure account for if the end if the sub_path is the end of the prgm.
      tkn.next = function() { var f = tkn.branches.first(); return f === tkn.sub_path.start ? undefined : f };
      this.tkn.loop_count = undefined;
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
      return next === tkn.looper.sub_path.start ? undefined : next
    };
    
    return old.call(this);
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
        return next === tkn.looper.sub_path.start ? undefined : next
      };
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

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
