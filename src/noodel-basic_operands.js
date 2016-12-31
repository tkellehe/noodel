(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){
  
//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_mini_digit, characters.correct("⁺")), function(cmd) {
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
Command.add(1, noodel.commandify(characters.regex.a_mini_digit, characters.correct("⁻")), function(cmd) {
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
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(0, noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁺")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.add_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")+characters.correct("ʂ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var lhs = this.tkn.inputs.front();
    if(lhs) {
      var rhs = this.tkn.inputs.front();
      if(rhs) {
        this.tkn.outputs.back(lhs.sub_flip(rhs, this.tkn));
      } else this.tkn.outputs.back(lhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
