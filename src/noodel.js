(function(global, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

Path.prototype.printify = function() {
  var r = (new ARRAY(this.outputs.__array__)).printify();
  
  var blocks = r.split(characters.correct("ð")), rows = [];
  for(var i = 0; i < blocks.length; ++i) {
    var block = blocks[i], row = 0;
    for(var j = 0; j < block.length; ++j) {
      if(rows[row] === undefined) rows[row] = "";
      if(block[j] === characters.correct("¬")) row++;
      else rows[row] += block[j];
    }
  }
  
  r = (rows[0] === undefined ? "" : rows[0]);
  for(var i = 1; i < rows.length; ++i) r += "\n" + (rows[i] === undefined ? "" : rows[i]);
  
  return r;
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
