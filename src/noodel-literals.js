(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(noodel.commandify(characters.correct("“"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.params[0]));
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each printable character following it.
Command.add(noodel.commandify(characters.correct("‘"), characters.regex.a_printable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i)
      a.push(new STRING(this.tkn.params[0][i]));
    this.tkn.outputs.back(new ARRAY(a));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(new RegExp("^((?:\\d*\\.\\d+)|(?:\\d+))$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new NUMBER(+this.tkn.literal));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number based off of a fraction and places it into the pipe.
Command.add(new RegExp("^(\\d*\/\\d+)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = this.tkn.literal.split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      num = +a[0];
    }
    this.tkn.outputs.back(new NUMBER(num/den));
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)