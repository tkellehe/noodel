(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){
  
//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var c = +characters.tiny_num_to_num(this.tkn.params[0]);
      while(c--) f = f.increment(this.tkn);
      this.tkn.outputs.back(f);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁻")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var c = +characters.tiny_num_to_num(this.tkn.params[0]);
      while(c--) f = f.decrement(this.tkn);
      this.tkn.outputs.back(f);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var c = f.integerify().value;
      var g = this.tkn.inputs.front();
      if(g) {
        if(g.type === "NUMBER") {
          this.tkn.outputs.back(new NUMBER(g.value * c));
        } else {
          while(c--) g = g.increment(this.tkn);
          this.tkn.outputs.back(g);
        }
      }
    }
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          this.tkn.outputs.back(new NUMBER(g.value / c));
        } else {
          while(c--) g = g.decrement(this.tkn);
          this.tkn.outputs.back(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(0, noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁺")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add_flip(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub_flip(rhs));
      } else path.top(lhs);
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
