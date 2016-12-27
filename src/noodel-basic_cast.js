(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Type cast operations.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(noodel.commandify("'"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      this.tkn.outputs.back(f.stringify());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Numberifies the first item in the pipe.
Command.add(noodel.commandify("#"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      this.tkn.outputs.back(f.numberify());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Arrayifies the first item in the pipe.
Command.add(noodel.commandify("@"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      this.tkn.outputs.back(f.arrayify());
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Collects all of the items in the pipe and creates an array for them.
Command.add(noodel.commandify(characters.correct("œ")), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var pipe = new Pipe();
    pipe.pipe(this.tkn.inputs);
    if(pipe.length()) {
      this.tkn.outputs.back(new ARRAY(pipe.__array__));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified in the pipe and creates an array for them.
Command.add(noodel.commandify(characters.correct("œ") + "(\\d+)"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = [];
    for(var i = +this.tkn.params[0]; i-- && this.tkn.inputs.length();) a.push(this.tkn.inputs.front());
    if(a.length) {
      this.tkn.outputs.back(new ARRAY(a));
    }
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
