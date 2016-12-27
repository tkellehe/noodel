(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Operations for printing.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Clears the path's outputs and copies what is in the front of the pipe into the path's output.
Command.add(noodel.commandify(characters.correct("ç")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("Ç")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("þ")), function(cmd) {
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
Command.add(noodel.commandify(characters.correct("Þ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.first();
    if(f) {
      path.outputs.back(f.copy());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
