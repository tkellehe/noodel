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
    path.top(new NUMBER(noodel.random_int(0, +this.tkn.params[0])));
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
    var c = +characters.tiny_num_to_num(this.tkn.params[0]);
    while(c--) path.move_up();
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Move the stack ptr down one.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("ʠ")), function(cmd) {
  cmd.exec = function(path) {
    var c = +characters.tiny_num_to_num(this.tkn.params[0]);
    while(c--) path.move_down();
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

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
