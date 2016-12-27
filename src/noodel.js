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

})(this, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
