(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// String Manipulation Commands.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Converts element into lowercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "L"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_lowercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Converts element into uppercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "U"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_uppercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Switches case of item.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "S"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.switchcase());
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
