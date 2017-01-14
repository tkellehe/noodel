(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Misc. Commands.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Terminates the program.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "`"), function(cmd) {
  cmd.exec = function(path) {
    path.stop();
  }
});

//------------------------------------------------------------------------------------------------------------
/// Clears the properties that were added to a particulat object.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "~"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first(); if(f) f.props.clear();
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "o"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2));
      } else {
        path.top(new NUMBER(f.length() % 2));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "O"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2));
      } else {
        path.top(new NUMBER(f.length() % 2));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "e"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2 ? 1 : 0));
      } else {
        path.top(new NUMBER(f.length() % 2 ? 1 : 0));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Pops off and pushes whether or not it is even or odd.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "E"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value % 2 ? 1 : 0));
      } else {
        path.top(new NUMBER(f.length() % 2 ? 1 : 0));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        var max, min;
        var g = path.top();
        if(g) {
          max = Math.max(f.value, g.value);
          min = Math.min(f.value, g.value);
        } else {
          max = Math.max(f.value, 0);
          min = Math.min(f.value, 0);
        }
        path.top(new NUMBER(noodel.random_int(min, max)));
      } else {
        path.top(f);
        path.top(new NUMBER(noodel.random_int(0, f.length() - 1)));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(noodel.random_int(0, this.tkn.params[0])));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(0, noodel.commandify(characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    path.move_up();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(0, noodel.commandify(characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    path.move_down();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    var c = this.tkn.params[0];
    while(c--) path.move_up();
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0])
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    var c = this.tkn.params[0];
    while(c--) path.move_down();
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0])
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr up one.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("ƥ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      while(c--) path.move_up();
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      while(c--) path.move_down();
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr to the top.
Command.add(0, noodel.commandify(characters.correct("ƥ")+"\\*"), function(cmd) {
  cmd.exec = function(path) {
    path.move_to_top();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr to the bottom.
Command.add(0, noodel.commandify(characters.correct("ʠ")+"\\*"), function(cmd) {
  cmd.exec = function(path) {
    path.move_to_bottom();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Jump into the array at the current position, if there is not an array it will create one.
Command.add(0, noodel.commandify(characters.correct("ı")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_in();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Jump outof the array, if there is not an array it will create one.
Command.add(0, noodel.commandify(characters.correct("ȷ")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_out();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Negate the object on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "!"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(f.is_falsy());
    } else {
      path.top(new NUMBER(1));
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Negate the object on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "?"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(f.is_truthy());
    } else {
      path.top(new NUMBER(0));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of milliseconds since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ")), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime()));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of seconds since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "s"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 1000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of minutes since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "m"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 60000));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Gets number of hours since 01/01/1970.
Command.add(0, noodel.commandify(characters.correct("Ƈ") + "h"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER((new Date).getTime() / 1200000));
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
