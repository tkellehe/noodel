(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Blocks the pipe preventing all items from moving on.
Command.add(0, noodel.commandify(characters.correct("Ḃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.wipe();
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Removes the item in the front of the pipe.
Command.add(0, noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.front();
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe to the back.
Command.add(0, noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) this.tkn.inputs.back(f);
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the back of the pipe to the front.
Command.add(0, noodel.commandify(characters.correct("Ė")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.back();
    if(f) this.tkn.inputs.front(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("ʂ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      var g = this.tkn.inputs.front();
      if(g) {
        this.tkn.outputs.back(g);
      }
      this.tkn.outputs.back(f);
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
