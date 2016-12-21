(function(global, Pipe, Command, Token, Path, CHAR, NUMBER, STRING, ARRAY){

function in_to_out(tkn, path) {
  tkn.outputs.pipe(tkn.inputs);
}
function out_to_in(tkn, path) {
  if(tkn.parent) tkn.inputs.pipe(tkn.parent.outputs);
}

/// NOPs
Command.commands[" "] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};
Command.commands["\t"] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};
Command.commands["\n"] = function(cmd) {
  cmd.exec = out_to_in;
  cmd.exec = in_to_out;
};

Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };

})(this, this.Pipe, this.Command, this.Token, this.Path, this.types.CHAR, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
