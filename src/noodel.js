(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

Path.prototype.printify = function() {
  return (new ARRAY(this.outputs.__array__)).printify();
}
  
global.noodel = function noodel(code) { if(typeof code === "string" && code.length) return new Path(code) };
noodel.commandify = function(cmd) {
  if(arguments.length > 1)
    cmd = Array.prototype.join.call(arguments, ")(");
  return new RegExp("^(" + cmd + ")$");
};

noodel.in_to_out = function(path) {
  this.tkn.outputs.pipe(this.tkn.inputs);
};
noodel.out_to_in = function(path) {
  if(this.tkn.parent) this.tkn.inputs.pipe(this.tkn.parent.outputs);
};

//------------------------------------------------------------------------------------------------------------
/// NOPs
Command.add(noodel.commandify("[ \t\n]"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  cmd.exec = noodel.in_to_out;
});

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
