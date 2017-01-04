(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(0, noodel.commandify(characters.correct("ç")), function(cmd) {
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
Command.add(0, noodel.commandify(characters.correct("Ç")), function(cmd) {
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
Command.add(0, noodel.commandify(characters.correct("Þ")), function(cmd) {
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
Command.add(0, noodel.commandify(characters.correct("þ")), function(cmd) {
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
// Creates an exception based off of what is in the pipe.
Command.add(0, noodel.commandify(characters.correct("€")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    noodel.make_error(f ? f : new STRING("<UNDEFINED>¶"), path);
  }
        
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var tkn = this.tkn;
    tkn.next = function() { return tkn.path.start };
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("Ñ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      path.outputs.back(f).back(new STRING("¶"));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Copies what is in the front of the pipe into the path's output followed by a new line.
Command.add(0, noodel.commandify(characters.correct("ñ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    if(f) {
      path.outputs.back(f.copy()).back(new STRING("¶"));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Generates a random integer.
Command.add(0, noodel.commandify(characters.correct("ṛ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "NUMBER") {
        var max, min;
        var g = this.tkn.intputs.front();
        if(g) {
          max = Math.max(f.value, g.value);
          min = Math.min(f.value, g.value);
        } else {
          max = Math.max(f.value, 0);
          min = Math.min(f.value, 0);
        }
        this.tkn.outputs.back(new NUMBER(noodel.random_int(min, max)));
      } else {
        this.tkn.outputs.back(noodel.random_int(0, f.length() - 1));
        this.tkn.outputs.back(f);
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
