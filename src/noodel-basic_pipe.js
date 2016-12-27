(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations directly to the Pipe.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Blocks the pipe preventing all items from moving on.
Command.add(noodel.commandify(characters.correct("ḃ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.wipe();
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Removes the item in the front of the pipe.
Command.add(noodel.commandify(characters.correct("ḋ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.inputs.front();
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Places what is in the front of the pipe to the back.
Command.add(noodel.commandify(characters.correct("ė")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) this.tkn.inputs.back(f);
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
