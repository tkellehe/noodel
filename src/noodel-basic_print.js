(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("ç")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    path.stdout.wipe();
    if(f) {
      path.stdout.back(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("ç"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.wipe();
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.first().copy());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Clears the path's outputs and places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Ç")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    path.stdout.wipe();
    if(f) {
      path.stdout.back(f);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Clears the path's outputs and places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Ç"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.wipe();
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.top());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("þ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.first().copy());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Þ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.top());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Copies what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy());
    }
    path.stdout.back(new STRING("¶"));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Copies what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("ñ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.first().copy());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
    path.stdout.back(new STRING("¶"));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Places what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("Ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f);
    }
    path.stdout.back(new STRING("¶"));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Places what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("Ñ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.first();) {
      array.push(path.top());
    }
    if(path.first()) path.stdout.back(path.top());
    for(var c = array.length; c--;) {
      path.top(array.pop());
    }
    path.stdout.back(new STRING("¶"));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Places the stack into the stdout.
Command.add(0, noodel.commandify(characters.correct("Ð")), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.back(path.stack);
  }
});

//------------------------------------------------------------------------------------------------------------
// Clears the stdout.
Command.add(0, noodel.commandify(characters.correct("ß")), function(cmd) {
  cmd.exec = function(path) {
    path.stdout.wipe();
  }
});

//------------------------------------------------------------------------------------------------------------
// Copies what is on top of the stack into the front of stdin.
Command.add(0, noodel.commandify(characters.correct("ø")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdin.front(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Copies what is on top of the stack into the front of stdin.
Command.add(0, noodel.commandify(characters.correct("ø"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var item = path.first_ith(this.tkn.params[0]);
    if(item)
    {
      path.stdin.front(item.copy());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Pushes what is on the top of the stack into the stdin.
Command.add(0, noodel.commandify(characters.correct("Ø")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    // If the first token then consume everything in stdin.
    if(path.start == this.tkn) {
      while(f) {
        path.stdin.front(f);
        f = path.top();
      }
    } else if(f) {
      path.stdin.front(f);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Pushes what is on the top of the stack into the stdin.
Command.add(0, noodel.commandify(characters.correct("Ø"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var item = path.top_ith(this.tkn.params[0]);
    if(item)
    {
      path.stdin.front(item);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Copies the front of stdin onto the stack.
Command.add(0, noodel.commandify(characters.correct("æ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.stdin.first();
    if(f) {
      path.top(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Copies the front of stdin onto the stack.
Command.add(0, noodel.commandify(characters.correct("æ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.stdin.first();) {
      array.push(path.stdin.front());
    }
    if(path.stdin.first()) path.top(path.stdin.first().copy());
    for(var c = array.length; c--;) {
      path.stdin.front(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Consumes from stdin onto the stack.
Command.add(0, noodel.commandify(characters.correct("Æ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.stdin.front();
    if(f) {
      path.top(f);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Consumes from stdin onto the stack.
Command.add(0, noodel.commandify(characters.correct("Æ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var array = [];
    for(var c = this.tkn.params[0]; c-- && path.stdin.first();) {
      array.push(path.stdin.front());
    }
    if(path.stdin.first()) path.top(path.stdin.front());
    for(var c = array.length; c--;) {
      path.stdin.front(array.pop());
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
