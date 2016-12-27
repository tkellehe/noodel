(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){
  
//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(noodel.commandify(characters.correct("⁺")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("⁻")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("⁺")+characters.correct("ʂ")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("⁻")+characters.correct("ʂ")), function(cmd) {
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

//------------------------------------------------------------------------------------------------------------
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁺")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var rhs = this.tkn.inputs.front();
    if(rhs) {
      var lhs = this.tkn.inputs.front();
      if(lhs) {
        this.tkn.outputs.back(lhs.add(rhs, this.tkn));
      } else this.tkn.outputs.back(rhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
Command.add(noodel.commandify(characters.correct("ʂ")+characters.correct("⁻")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var rhs = this.tkn.inputs.front();
    if(rhs) {
      var lhs = this.tkn.inputs.front();
      if(lhs) {
        this.tkn.outputs.back(lhs.sub(rhs, this.tkn));
      } else this.tkn.outputs.back(rhs);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
