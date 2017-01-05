(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
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
// Clears the path's outputs and places what is in the front of the pipe into the path's output.
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
// Copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy());
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.first();
    if(f) {
      path.stdout.back(f.copy()).back(new STRING("¶"));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("Ñ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.stdout.back(f).back(new STRING("¶"));
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
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
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
