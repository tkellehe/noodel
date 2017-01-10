(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Removes the current stack.
Command.add(0, noodel.commandify(characters.correct("Ḃ")), function(cmd) {
  cmd.exec = function(path) {
    path.jump_out();
    path.top();
  }
});

//------------------------------------------------------------------------------------------------------------
// Removes the item on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = function(path) {
    path.top();
  }
});

//------------------------------------------------------------------------------------------------------------
// Duplicates the item on the top of the stack.
Command.add(0, noodel.commandify(characters.correct("ḋ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.top(f.copy());
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is on the top of the stack to the bottom.
Command.add(0, noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.bottom(f);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is on the bottom of the stack and places it on the top.
Command.add(0, noodel.commandify(characters.correct("Ė")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.bottom();
    if(f) path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Swaps what is on the top of the stack with the item right below it.
Command.add(0, noodel.commandify(characters.correct("ṡ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      path.top(f);
      if(g) {
        path.top(g);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Swaps what is on the bottom of the stack with the item right above it.
Command.add(0, noodel.commandify(characters.correct("Ṡ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.bottom();
    if(f) {
      var g = path.bottom();
      path.bottom(f);
      if(g) {
        path.bottom(g);
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
